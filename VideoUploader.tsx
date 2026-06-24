"use client";
import { useState } from "react";

interface VideoItem {
  id: number;
  title: string;
  videoData: string;
  description: string | null;
}

export function VideoUploader({ existingVideos }: { existingVideos: VideoItem[] }) {
  const [videos, setVideos] = useState<VideoItem[]>(existingVideos);
  const [uploading, setUploading] = useState(false);
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadDesc, setUploadDesc] = useState("");
  const [showUpload, setShowUpload] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [msg, setMsg] = useState("");

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 50 * 1024 * 1024) {
      setMsg("File too large. Max 50MB.");
      return;
    }
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    if (!uploadTitle) setUploadTitle(file.name.replace(/\.[^.]+$/, ""));
  }

  async function handleUpload() {
    if (!selectedFile) return;
    setUploading(true);
    setMsg("");
    try {
      const reader = new FileReader();
      const dataUrl = await new Promise<string>((resolve, reject) => {
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(selectedFile);
      });

      const res = await fetch("/api/uploaded-videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: uploadTitle || "Untitled", videoData: dataUrl, description: uploadDesc }),
      });

      if (res.ok) {
        const d = await res.json();
        setVideos(prev => [d.video, ...prev]);
        setSelectedFile(null);
        setPreviewUrl("");
        setUploadTitle("");
        setUploadDesc("");
        setShowUpload(false);
        setMsg("Video uploaded successfully!");
        setTimeout(() => setMsg(""), 3000);
      } else {
        setMsg("Upload failed. Video may be too large.");
      }
    } catch {
      setMsg("Upload failed. Please try again.");
    }
    setUploading(false);
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this video?")) return;
    await fetch("/api/uploaded-videos", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setVideos(prev => prev.filter(v => v.id !== id));
  }

  return (
    <div>
      {/* Upload button */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-gray-500">{videos.length} video(s)</p>
        <button onClick={() => setShowUpload(!showUpload)}
          className="gold-gradient text-primary-dark font-bold px-6 py-2.5 rounded-full hover:opacity-90 transition-opacity">
          {showUpload ? "Cancel" : "📱 Upload Video from Phone"}
        </button>
      </div>

      {msg && (
        <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 mb-6 text-sm font-semibold">
          {msg}
        </div>
      )}

      {/* Upload form */}
      {showUpload && (
        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 mb-8">
          <h3 className="font-bold text-primary text-lg mb-4">Upload a Video</h3>
          <label className="block cursor-pointer mb-4">
            <div className="border-2 border-dashed border-accent rounded-xl p-8 text-center hover:bg-accent/5 transition-colors">
              {previewUrl ? (
                <video src={previewUrl} controls className="max-h-48 mx-auto rounded-lg" />
              ) : (
                <>
                  <span className="text-4xl block mb-2">🎬</span>
                  <p className="font-semibold text-primary">Tap to select a video from your gallery</p>
                  <p className="text-xs text-gray-400 mt-1">MP4, MOV, WebM • Max 50MB</p>
                </>
              )}
            </div>
            <input type="file" accept="video/*" onChange={handleFileSelect} className="hidden" />
          </label>
          <div className="space-y-3">
            <input type="text" value={uploadTitle} onChange={e => setUploadTitle(e.target.value)}
              placeholder="Video title" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-accent outline-none" />
            <input type="text" value={uploadDesc} onChange={e => setUploadDesc(e.target.value)}
              placeholder="Short description (optional)" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-accent outline-none" />
            <button onClick={handleUpload} disabled={!selectedFile || uploading}
              className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary-light transition-colors disabled:opacity-50">
              {uploading ? "Uploading..." : "⬆️ Upload Video"}
            </button>
          </div>
        </div>
      )}

      {/* Video grid */}
      {videos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map(v => (
            <div key={v.id} className="bg-gray-50 rounded-xl overflow-hidden shadow-md card-hover">
              <div className="aspect-video bg-black">
                <video src={v.videoData} controls className="w-full h-full object-contain" />
              </div>
              <div className="p-4 flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-primary">{v.title}</h3>
                  {v.description && <p className="text-sm text-gray-500 mt-1">{v.description}</p>}
                </div>
                <button onClick={() => handleDelete(v.id)} className="text-red-400 hover:text-red-600 text-xs shrink-0 ml-2">✕</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !showUpload && (
          <div className="text-center py-12">
            <span className="text-5xl block mb-3">🎬</span>
            <p className="text-gray-400">No videos uploaded yet. Tap the button above to upload from your phone.</p>
          </div>
        )
      )}
    </div>
  );
}
