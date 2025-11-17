import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { MusicPlayer } from "@/components/MusicPlayer";
import { TrackCard } from "@/components/TrackCard";
import { Button } from "@/components/ui/button";
import { Play, MoreHorizontal } from "lucide-react";

interface PlaylistProps {
  currentTrack: {
    title: string;
    artist: string;
    cover: string;
  };
  setCurrentTrack: (track: { title: string; artist: string; cover: string }) => void;
}

const Playlist = ({ currentTrack, setCurrentTrack }: PlaylistProps) => {
  const { id } = useParams();
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const savedTracks = localStorage.getItem(`playlist_${id}`);
    if (savedTracks) {
      setTracks(JSON.parse(savedTracks));
    }
  }, [id]);

  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const savedPlaylists = localStorage.getItem('userPlaylists');
    if (savedPlaylists) {
      setPlaylists(JSON.parse(savedPlaylists));
    }
  }, []);

  const playlist = {
    title: playlists.find(p => p.id === parseInt(id || '0'))?.name || "My Playlist",
    description: "Your favorite songs collection",
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
    totalTracks: tracks.length,
    totalDuration: "1 hr 23 min",
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto pb-24">
          {/* Playlist Header */}
          <div className="bg-gradient-to-b from-primary/30 to-background p-8">
            <div className="flex items-end space-x-6">
              <img
                src={playlist.cover}
                alt={playlist.title}
                className="w-56 h-56 rounded shadow-2xl"
              />
              <div className="flex-1">
                <p className="text-sm font-semibold mb-2">PLAYLIST</p>
                <h1 className="text-6xl font-bold mb-6">{playlist.title}</h1>
                <p className="text-muted-foreground mb-2">{playlist.description}</p>
                <div className="flex items-center space-x-2 text-sm">
                  <span className="font-semibold">{playlist.totalTracks} lagu</span>
                  <span>•</span>
                  <span className="text-muted-foreground">{playlist.totalDuration}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="p-6 flex items-center space-x-4">
            <Button size="icon" className="h-14 w-14 rounded-full bg-primary hover:bg-primary/90">
              <Play className="w-6 h-6 fill-current ml-0.5" />
            </Button>
            <Button size="icon" variant="ghost" className="h-10 w-10">
              <MoreHorizontal className="w-6 h-6" />
            </Button>
          </div>

          {/* Track List */}
          <div className="px-6">
            <div className="grid grid-cols-[80px_1fr_1fr_100px_80px] gap-4 items-center py-2 px-4 text-sm text-muted-foreground border-b border-border mb-2">
              <div className="text-center">#</div>
              <div>JUDUL</div>
              <div>ALBUM</div>
              <div className="text-right">DURASI</div>
              <div></div>
            </div>
            {tracks.map((track, index) => (
              <TrackCard
                key={track.id}
                index={index + 1}
                title={track.title}
                artist={track.artist}
                album={track.album}
                duration={track.duration}
                cover={track.cover}
                setCurrentTrack={setCurrentTrack}
              />
            ))}
          </div>
        </main>
        <MusicPlayer currentTrack={currentTrack} />
      </div>
    </div>
  );
};

export default Playlist;
