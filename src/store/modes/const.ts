import { ScanMode } from "../../data/ScanMode";

export const modes: ScanMode[] = [
    {
        key: "ENT",
        libelle: "Entrée",
        color: "#DD2C00",
        destination: "Entree",
        icon: "mdi-truck",
        permissionId: "ACQUASCANNERENTREE"
    },
    {
        key: "RCM",
        libelle: "Rectification -",
        color: "#C51162",
        destination: "RectMinus",
        icon: "mdi-minus-circle",
        permissionId: "ACQUASCANNERRCP"
    },
    {
        key: "RCP",
        libelle: "Rectification +",
        color: "#AA00FF",
        destination: "RectPlus",
        icon: "mdi-plus-circle",
        permissionId: "ACQUASCANNERRCP"
    },
    {
        key: "INV",
        libelle: "Inventaire",
        color: "#0091EA",
        destination: "Inventaire",
        icon: "mdi-barcode-scan",
        permissionId: "ACQUASCANNERINV"
    },
    {
        key: "VEN",
        libelle: "Vente",
        color: "#00BFA5",
        destination: "Vente",
        icon: "mdi-cart",
        permissionId: "ACQUASCANNERVEN"
    },
    {
        key: "LIV",
        libelle: "Livraison",
        color: "#76B041",
        destination: "Livraison",
        icon: "mdi-dolly",
        permissionId: "ACQUASCANNERLIV"
    },
    {
        key: "COM",
        libelle: "Commande",
        color: "#FFAB00",
        destination: "Commande",
        icon: "mdi-arrow-up-bold-box-outline",
        permissionId: "Never"
    },
    {
        key: "FOU",
        libelle: "Choix Fournisseur",
        color: "#FFAB00",
        destination: "ChoixFournisseur",
        icon: "mdi-arrow-up-bold-box-outline",
        permissionId: "Always"
    },
    {
        key: "ETI",
        libelle: "Etiquettes",
        color: "#FF7043",
        destination: "Etiquettes",
        icon: "mdi-note-text",
        permissionId: "Never"
    }];
