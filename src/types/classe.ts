export interface Classe {
    id: string;
    nom: string;
    description: string;
    slogan?: string;
    icon?: string;
    suspendue?: boolean;
    eleves?: number;
    viewMode: "grid" | "list";
}