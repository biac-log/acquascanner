import { ScanMode } from "../../data/ScanMode";

export const modes: ScanMode[] = [
    {
        key: "ENT",
        libelle: "Entrée",
        color: "#FFAB00",
        destination: "Entree",
        icon: "mdi-truck",
        permissionId: "ACQUASCANNERENTREE"
    },
    {
        key: "RCM",
        libelle: "Rectification -",
        color: "#0091EA",
        destination: "RectMinus",
        icon: "mdi-minus-circle",
        permissionId: "ACQUASCANNERRCP"
    },
    {
        key: "RCP",
        libelle: "Rectification +",
        color: "#00BFA5",
        destination: "RectPlus",
        icon: "mdi-plus-circle",
        permissionId: "ACQUASCANNERRCP"
    },
    {
        key: "INV",
        libelle: "Inventaire",
        color: "#DD2C00",
        destination: "Inventaire",
        icon: "mdi-barcode-scan",
        permissionId: "ACQUASCANNERINV"
    },
    {
        key: "VEN",
        libelle: "Vente",
        color: "#AA00FF",
        destination: "Vente",
        icon: "mdi-cart",
        permissionId: "ACQUASCANNERVEN"
    },
    {
        key: "LIV",
        libelle: "Livraison",
        color: "#C51162",
        destination: "Livraison",
        icon: "mdi-dolly",
        permissionId: "ACQUASCANNERLIV"
    },
    {
        key: "COM",
        libelle: "Commande",
        color: "#76B041",
        destination: "Commande",
        icon: "mdi-arrow-up-bold-box-outline",
        permissionId: "Never"
    },
    {
        key: "FOU",
        libelle: "ChoixFournisseur",
        color: "#76B041",
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
        permissionId: "Always"
    }];
