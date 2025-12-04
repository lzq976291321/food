import React, { useEffect, useState } from 'react';
import { X, Loader2, AlertTriangle, FileText, ExternalLink } from 'lucide-react';
import { FoodItem } from '../types';

interface RecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  foodItem: FoodItem;
}

const RecipeModal: React.FC<RecipeModalProps> = ({ isOpen, onClose, foodItem }) => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (isOpen && foodItem) {
      fetchRecipe(foodItem);
    }
  }, [isOpen, foodItem]);

  const fetchRecipe = async (item: FoodItem) => {
    setLoading(true);
    setError(false);
    setContent('');

    // Define potential paths. 
    // Most items are in the category folder provided, but some fallback might be needed.
    const category = item.category || '炒菜';
    const pathsToTry = [
        `${category}/${item.name}.md`,
        `炒菜/${item.name}.md`, 
        `家常菜/${item.name}.md`,
        `肉菜/${item.name}.md`,
        `素菜/${item.name}.md`
    ];

    let foundContent = null;

    for (const path of pathsToTry) {
        const targetUrl = `https://cooklikehoc.soilzhu.su/${path}`;
        // Use allorigins as a proxy to bypass CORS
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;

        try {
            const response = await fetch(proxyUrl);
            if (!response.ok) continue;

            const data = await response.json();
            
            // allorigins returns the status in the JSON. If status.url exists, it might be a redirect or error info.
            // data.contents is the actual body string.
            if (data.contents && !data.status?.url) {
                // Check if it's a 404 page returned as text (sometimes happens with proxies)
                if (data.contents.includes("404") && data.contents.length < 500) {
                    continue;
                }
                foundContent = data.contents;
                break; // Found it!
            }
        } catch (err) {
            console.warn(`Failed to fetch ${path}`, err);
        }
    }

    if (foundContent) {
        const htmlContent = parseMarkdown(foundContent);
        setContent(htmlContent);
        setLoading(false);
    } else {
        console.error("Recipe not found in any common paths.");
        setError(true);
        setLoading(false);
    }
  };

  // Process inline markdown elements (bold, code, links)
  const processInline = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold bg-pink-500/20 px-1 rounded text-shadow-sm">$1</strong>')
      .replace(/`([^`]+)`/g, '<code class="bg-gray-800 text-yellow-300 px-1 py-0.5 rounded font-mono text-sm border border-gray-700">$1</code>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" class="text-cyan-400 underline decoration-cyan-500/30 underline-offset-4 hover:text-cyan-200 transition-colors">$1</a>');
  };

  // Robust Markdown to HTML parser with custom styling
  const parseMarkdown = (md: string) => {
    // Normalize line endings and remove images
    const cleanMd = md.replace(/\r\n/g, '\n').replace(/!\[.*?\]\(.*?\)/g, '');
    
    const lines = cleanMd.split('\n');
    const processedLines = lines.map(line => {
        const trimmed = line.trim();
        
        // H1 - Title
        if (line.startsWith('# ')) {
            return `<h1 class="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 mb-8 pb-4 border-b-2 border-gray-800 uppercase tracking-tighter shadow-sm">${processInline(line.slice(2))}</h1>`;
        }
        // H2 - Sections (Ingredients, Steps)
        if (line.startsWith('## ')) {
            return `<h2 class="text-2xl font-bold text-cyan-400 mt-10 mb-6 uppercase tracking-widest flex items-center gap-3"><span class="w-2 h-6 bg-yellow-400 transform -skew-x-12 shadow-[0_0_10px_rgba(250,204,21,0.5)]"></span>${processInline(line.slice(3))}</h2>`;
        }
        // H3 - Subsections
        if (line.startsWith('### ')) {
            return `<h3 class="text-lg font-bold text-yellow-300 mt-6 mb-3 pl-3 border-l-4 border-yellow-300/50">${processInline(line.slice(4))}</h3>`;
        }
        // Blockquote / Tips
        if (line.startsWith('> ')) {
            return `<div class="my-6 p-4 border-l-4 border-purple-500 bg-gradient-to-r from-purple-900/20 to-transparent text-gray-300 italic rounded-r-lg">${processInline(line.slice(2))}</div>`;
        }
        // Unordered List (bullet points)
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
            const content = trimmed.substring(2);
            return `<div class="flex items-start gap-3 mb-3 pl-2 group"><span class="text-pink-500 mt-1.5 text-[0.6rem] group-hover:text-yellow-400 transition-colors duration-300">◆</span><span class="text-gray-300 leading-relaxed flex-1 group-hover:text-gray-100 transition-colors">${processInline(content)}</span></div>`;
        }
        // Ordered List (1. Step)
        if (/^\d+\.\s/.test(trimmed)) {
            const content = trimmed.replace(/^\d+\.\s/, '');
            return `<div class="flex items-start gap-4 mb-4 p-4 rounded-lg bg-gray-900/40 border border-gray-800 hover:border-cyan-500/30 hover:bg-gray-900/60 transition-all duration-300"><span class="text-cyan-500 font-mono font-bold mt-0.5 whitespace-nowrap">>></span><span class="text-gray-200 leading-relaxed flex-1">${processInline(content)}</span></div>`;
        }
        
        // Empty line
        if (trimmed === '') {
            return '<div class="h-4"></div>';
        }

        // Standard Paragraph
        return `<p class="mb-4 text-gray-300 leading-relaxed font-sans">${processInline(line)}</p>`;
    });

    return processedLines.join('');
  };

  if (!isOpen) return null;

  const category = foodItem.category || '炒菜';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-md transition-opacity duration-300" 
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-3xl max-h-[85vh] bg-[#0a0a0a] border border-cyan-500/30 shadow-[0_0_50px_rgba(0,255,255,0.1)] rounded-xl overflow-hidden flex flex-col animate-scale-in">
        
        {/* Header */}
        <div className="bg-gray-900/50 border-b border-cyan-500/20 p-4 md:p-5 flex items-center justify-between backdrop-blur-sm z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
               <FileText className="text-cyan-400 w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black italic text-gray-100 tracking-wider uppercase">
                RECIPE_DATABASE
              </h2>
              <p className="text-[10px] text-cyan-500 font-mono tracking-[0.2em]">ACCESSING: {foodItem.name}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300 hover:rotate-90"
          >
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 scrollbar-thin scrollbar-thumb-cyan-500/50 scrollbar-track-gray-900/50">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-80 space-y-6">
              <div className="relative">
                <div className="absolute inset-0 blur-xl bg-pink-500/20 rounded-full animate-pulse"></div>
                <Loader2 className="animate-spin text-pink-500 w-16 h-16 relative z-10" />
              </div>
              <div className="text-center space-y-2">
                 <p className="font-mono text-xl text-white font-bold">DECRYPTING...</p>
                 <p className="font-mono text-sm text-pink-400 animate-pulse">Establishing secure link to culinary mainframe</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-80 space-y-6 text-center">
              <div className="p-4 bg-red-500/10 rounded-full border border-red-500/30 mb-2">
                <AlertTriangle className="text-red-500 w-12 h-12" />
              </div>
              <div>
                <h3 className="text-3xl font-black text-white mb-2">DATA CORRUPTED</h3>
                <p className="text-gray-400 max-w-md mx-auto">Could not retrieve recipe protocol for {foodItem.name}.</p>
              </div>
              <div className="flex flex-col gap-3 w-full max-w-xs">
                <button 
                  onClick={() => fetchRecipe(foodItem)}
                  className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-all uppercase tracking-widest text-sm"
                >
                  Retry Connection
                </button>
                <a 
                  href={`https://cooklikehoc.soilzhu.su/${category}/${foodItem.name}.md`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-700 hover:border-white text-gray-400 hover:text-white rounded transition-all text-sm uppercase tracking-wider"
                >
                  <ExternalLink size={16} />
                  Access Source Direct
                </a>
              </div>
            </div>
          ) : (
            <div 
              className="font-sans max-w-none"
              dangerouslySetInnerHTML={{ __html: content }} 
            />
          )}
        </div>

        {/* Footer */}
        <div className="bg-black/80 border-t border-gray-800 p-3 flex justify-center items-center backdrop-blur-sm">
          <a 
             href={`https://cooklikehoc.soilzhu.su/${category}/README`}
             target="_blank"
             rel="noreferrer"
             className="flex items-center gap-2 text-[10px] md:text-xs text-gray-500 font-mono hover:text-cyan-400 transition-colors uppercase tracking-widest group"
          >
            <span>SOURCE: cooklikehoc.soilzhu.su</span>
            <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;