import { ScanMode } from "../../data/ScanMode";

export const modes: ScanMode[] = [
    {
        key: "INV",
        libelle: "Inventaire",
        color: "#DD2C00",
        destination: "Inventaire",
        icon: "mdi-barcode-scan",
    },
    {
        key: "ENT",
        libelle: "Entrée",
        color: "#FFAB00",
        destination: "Entree",
        icon: "mdi-truck",
    },
    {
        key: "RCP",
        libelle: "Rectification +",
        color: "#00BFA5",
        destination: "RectPlus",
        icon: "mdi-plus-circle",
    },
    {
        key: "RCM",
        libelle: "Rectification -",
        color: "#0091EA",
        destination: "RectMinus",
        icon: "mdi-minus-circle",
    },
    {
        key: "VEN",
        libelle: "Vente",
        color: "#AA00FF",
        destination: "Vente",
        icon: "mdi-cart",
    },
    {
        key: "LIV",
        libelle: "Livraison",
        color: "#C51162",
        destination: "Livraison",
        icon: "mdi-dolly",
    }];