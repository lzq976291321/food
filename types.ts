export interface ConfettiParticle {
  id: number;
  x: number;
  y: number;
  color: string;
  velocity: { x: number; y: number };
  rotation: number;
  rotationSpeed: number;
  size: number;
}

export interface FoodItem {
  id: string;
  name: string;
  emoji: string;
  color: string;
  description: string;
  category?: string; // e.g., '炒菜', '红烧', '汤与粥', defaults to '炒菜' if undefined
}