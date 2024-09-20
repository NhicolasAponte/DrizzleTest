// import glassImage from "@/public/images/glass-verre.jpg";
// import {
//   GlassType,
//   MiscOptions,
//   Shape,
//   Thickness,
//   Tint,
// } from "@/lib/definitions/order-definitions";

const glassImage = "path/to/image";

export const productTypes = [
  {
    id: "1",
    type: "Tempered Glass",
    description:
      "This product is used most often for shelves, some fireplaces and table tops. Tempered glass breaks into many small pieces when broken and usually never cracks.",
    imageSrc: "path/to/image",
    alt: "Tempered Glass",
    shape_types: [],
    thickness_options: [],
    tint_types: [],
    misc_options: [],
    config_options: {
      shape: "",
      dimensions: "",
      thickness: "",
      tint: "",
      edgework: "",
      misc: "",
    },
  },
  {
    id: "2",
    type: "Insulated Unit/Dual Pane",
    description:
      "This product consists of two panes of tempered glass separated by a spacer. The space between the two panes of glass is filled with air. These are most often used in residential window applications.",
    imageSrc: "path/to/image",
    alt: "Insulated Unit/Dual Pane",
    shape_types: [],
    thickness_options: [],
    tint_types: [],
    misc_options: [],
    config_options: {
      //are both lites the same or can they be different?
      shape: "",
      dimensions: "",
      thickness: "",
      tint: "",
      misc: "",
      // lite2: {},
      spacer: "", // spacer options: 1/4", 3/8", 1/2"
    },
  },
  {
    id: "4",
    type: "Laminate/Safety Glass",
    description:
      "This product is often used in doors and windows for security to resist burglar intrusion or if accidentally broken to keep a safeguard on the door and window until replaced. This as well makes a good sound barrier for single pane glass applications. This type of safety glass holds together when shattered.",
    imageSrc: "path/to/image",
    alt: "Laminate/Safety Glass",
    shape_types: [],
    thickness_options: [],
    tint_types: [],
    misc_options: [],
    config_options: {
      shape: "",
      dimensions: "",
      thickness: "",
      tint: "",
      misc: "",
      edgework: "", // edgework options: polished, flat, seamed, bevel  
      lami_layer: "", // lami layer options: 0.030", 0.060"
    },
  },
  {
    id: "5",
    type: "Tempered Laminate",
    description:
      "This is a unique product that provides the surface strength and durability of tempered glass and the security of laminated glass. Tempered Laminated Glass, if broken, will break into small pieces yet be held together. This is often used in overhead and panel applications.",
    imageSrc: "path/to/image",
    alt: "Tempered Laminate",
    shape_types: [],
    thickness_options: [],
    tint_types: [],
    misc_options: [],
    config_options: {
      shape: "",
      dimensions: "",
      thickness: "",
      tint: "",
      edgework: "", // edgework options: polished, flat, seamed, bevel
      misc: "",
    },
  },
  {
    id: "8",
    type: "Shower Doors/Panels",
    description:
      'These products are made with 3/8” or 1/2" Tempered Glass with a selection of hardware such as hinges and handles as well as options such as bright guard to keep your glass looking like new for years.',
    imageSrc: "path/to/image",
    alt: "Shower Doors/Panels",
    shape_types: [],
    thickness_options: [],
    tint_types: [],
    misc_options: [],
    config_options: {
      shape: "",
      dimensions: "",
      thickness: "",
      tint: "",
      fabrication: "",
      misc: "",
    },
  },
  {
    id: "9",
    type: "Annealed Glass",
    description:
      'Often used in small pieces. This product is not considered a safety glass. Annealed glass does not shatter into small pieces. If broken, the piece will crack into large shards. Maximum Annealed Glass Size: 29-15/16" x 47-15/16". For pieces larger than this please select Tempered Glass.',
    imageSrc: "path/to/image",
    alt: "Annealed Glass",
    shape_types: [],
    thickness_options: [],
    tint_types: [],
    misc_options: [],
    config_options: {
      shape: "",
      dimensions: "",
      thickness: "",
      tint: "",
      fabrication: "",
      misc: "",
    },
  },
];

export const GlassInventoryItems = [
  {
    name: "SNX-L 62/34" 
  },
  {
    name: "SNE 50/25"
  },
  {
    name: "SNR 35 HT"
  },
  {
    name: "SatinDeco"
  },
  {
    name: "AG 50 LE"
  },
  {
    name: "AG 43"
  },
  {
    name: "IS20 LE-T"
  },
  {
    name: "Sunguard Spandrel HT"
  },
  {
    name: "NU 40 LE"
  },
  {
    name: "SN 68"
  },
  {
    name: "MC 27 LE-A"
  },
  {
    name: "MC 68 LE-T"
  },
  {
    name: "MC 68 LE-A"
  },
  {
    name: "SN 68 HT"
  },
];

export const shapeOptions = [
  {
    id: "1",
    name: "Square/Rectangle",
    imageSrc: "path/to/image",
    alt: "Square/Rectangle",
    required_dimensions: [
      { label: "Base", wholeNumber: "", fraction: "" },
      { label: "Height", wholeNumber: "", fraction: "" },
    ],
    thickness_options: [],
    tint_types: [],
    misc_options: [],
  },
  {
    id: "2",
    name: "Single Slope Rectangle",
    imageSrc: glassImage,
    alt: "Single Slope Rectangle",
    required_dimensions: [
      { label: "Base", wholeNumber: "", fraction: "" },
      { label: "Height", wholeNumber: "", fraction: "" },
      { label: "Top", wholeNumber: "", fraction: "" },
    ],
    thickness_options: [],
    tint_types: [],
    misc_options: [],
  },
  {
    id: "3",
    name: "Circle",
    imageSrc: glassImage,
    alt: "Circle",
    required_dimensions: [{ label: "Radius", wholeNumber: "", fraction: "" }],
    thickness_options: [],
    tint_types: [],
    misc_options: [],
  },
  {
    id: "4",
    name: "House",
    imageSrc: glassImage,
    alt: "House",
    required_dimensions: [
      { label: "Base", wholeNumber: "", fraction: "" },
      { label: "Height", wholeNumber: "", fraction: "" },
      { label: "Left Sub Height", wholeNumber: "", fraction: "" },
      { label: "Right Sub Height", wholeNumber: "", fraction: "" },
    ],
    thickness_options: [],
    tint_types: [],
    misc_options: [],
  },
  {
    id: "5",
    name: "Arch",
    imageSrc: glassImage,
    alt: "Arch",
    required_dimensions: [
      { label: "Base", wholeNumber: "", fraction: "" },
      { label: "Height", wholeNumber: "", fraction: "" },
      { label: "Radius", wholeNumber: "", fraction: "" },
    ],
    thickness_options: [],
    tint_types: [],
    misc_options: [],
  },
  {
    id: "6",
    name: "Arch-Top",
    imageSrc: glassImage,
    alt: "Arch-Top",
    required_dimensions: [
      { label: "Base", wholeNumber: "", fraction: "" },
      { label: "Height", wholeNumber: "", fraction: "" },
      { label: "Radius", wholeNumber: "", fraction: "" },
      { label: "Offset", wholeNumber: "", fraction: "" },
    ],
    thickness_options: [],
    tint_types: [],
    misc_options: [],
  },
  {
    id: "7",
    name: "Arch Top & Bottom",
    imageSrc: glassImage,
    alt: "Arch Top & Bottom",
    required_dimensions: [
      { label: "Base", wholeNumber: "", fraction: "" },
      { label: "Height", wholeNumber: "", fraction: "" },
      { label: "Radius", wholeNumber: "", fraction: "" },
      { label: "Offset", wholeNumber: "", fraction: "" },
    ],
    thickness_options: [],
    tint_types: [],
    misc_options: [],
  },
  {
    id: "8",
    name: "Arch Side",
    imageSrc: glassImage,
    alt: "Arch Side",
    required_dimensions: [
      { label: "Base", wholeNumber: "", fraction: "" },
      { label: "Height", wholeNumber: "", fraction: "" },
      { label: "Sub Height", wholeNumber: "", fraction: "" },
      { label: "Radius", wholeNumber: "", fraction: "" },
      { label: "Offset", wholeNumber: "", fraction: "" },
    ],
    thickness_options: [],
    tint_types: [],
    misc_options: [],
  },
  {
    id: "9",
    name: "Rounded Corner(s)",
    imageSrc: glassImage,
    alt: "Rounded Corner(s)",
    required_dimensions: [
      { label: "Base", wholeNumber: "", fraction: "" },
      { label: "Height", wholeNumber: "", fraction: "" },
      { label: "Radius", wholeNumber: "", fraction: "" },
    ],
    tint_types: [],
    misc_options: [],
  },
  {
    id: "10",
    name: "Clipped Corner(s)",
    imageSrc: glassImage,
    alt: "Clipped Corner(s)",
    required_dimensions: [
      { label: "Base", wholeNumber: "", fraction: "" },
      { label: "Height", wholeNumber: "", fraction: "" },
      { label: "Left Projection", wholeNumber: "", fraction: "" },
      { label: "Right Projection", wholeNumber: "", fraction: "" },
    ],
    thickness_options: [],
    tint_types: [],
    misc_options: [],
  },
  {
    id: "11",
    name: "Pentagon",
    imageSrc: glassImage,
    alt: "Pentagon",
    required_dimensions: [
      { label: "Base", wholeNumber: "", fraction: "" },
      { label: "Height", wholeNumber: "", fraction: "" },
      { label: "Edge Length", wholeNumber: "", fraction: "" },
    ],
    thickness_options: [],
    tint_types: [],
    misc_options: [],
  },
  {
    id: "12",
    name: "Hexagon",
    imageSrc: glassImage,
    alt: "Hexagon",
    required_dimensions: [
      { label: "Base", wholeNumber: "", fraction: "" },
      { label: "Height", wholeNumber: "", fraction: "" },
      { label: "Edge Length", wholeNumber: "", fraction: "" },
    ],
    thickness_options: [],
    tint_types: [],
    misc_options: [],
  },
  {
    id: "13",
    name: "Octagon",
    imageSrc: glassImage,
    alt: "Octagon",
    required_dimensions: [
      { label: "Base", wholeNumber: "", fraction: "" },
      { label: "Height", wholeNumber: "", fraction: "" },
      { label: "Edge Length", wholeNumber: "", fraction: "" },
    ],
    thickness_options: [],
    tint_types: [],
    misc_options: [],
  },
  {
    id: "14",
    name: "Ellipse",
    imageSrc: glassImage,
    alt: "Ellipse",
    required_dimensions: [
      { label: "Base", wholeNumber: "", fraction: "" },
      { label: "Height", wholeNumber: "", fraction: "" },
      { label: "Radius", wholeNumber: "", fraction: "" },
    ],
    tint_types: [],
    misc_options: [],
  },
  {
    id: "15",
    name: "Racetrack Oval",
    imageSrc: glassImage,
    alt: "Racetrack Oval",
    required_dimensions: [
      { label: "Base", wholeNumber: "", fraction: "" },
      { label: "Height", wholeNumber: "", fraction: "" },
      { label: "Radius", wholeNumber: "", fraction: "" },
    ],
    tint_types: [],
    misc_options: [],
  },
  {
    id: "16",
    name: "Quarter Round",
    imageSrc: glassImage,
    alt: "Quarter Round",
    required_dimensions: [
      { label: "Base", wholeNumber: "", fraction: "" },
      { label: "Height", wholeNumber: "", fraction: "" },
      { label: "Radius", wholeNumber: "", fraction: "" },
    ],
    tint_types: [],
    misc_options: [],
  },
  {
    id: "17",
    name: "Quarter Round with Notch",
    imageSrc: glassImage,
    alt: "Quarter Round with Notch",
    thickness_options: [],
    tint_types: [],
    misc_options: [],
  },
  {
    id: "18",
    name: "Half-Circle",
    imageSrc: glassImage,
    alt: "Half-Circle",
    thickness_options: [],
    tint_types: [],
    misc_options: [],
  },
  {
    id: "19",
    name: "Half-Circle with Notch",
    imageSrc: glassImage,
    alt: "Half-Circle with Notch",
    thickness_options: [],
    tint_types: [],
    misc_options: [],
  },
  {
    id: "20",
    name: "Trapezoid",
    imageSrc: glassImage,
    alt: "Trapezoid",
    thickness_options: [],
    tint_types: [],
    misc_options: [],
  },
  {
    id: "21",
    name: "Parallelogram",
    imageSrc: glassImage,
    alt: "Parallelogram",
    thickness_options: [],
    tint_types: [],
    misc_options: [],
  },
  {
    id: "22",
    name: "Right Triangle",
    imageSrc: glassImage,
    alt: "Right Triangle",
    thickness_options: [],
    tint_types: [],
    misc_options: [],
  },
  {
    id: "23",
    name: "Triangle",
    imageSrc: glassImage,
    alt: "Triangle",
    thickness_options: [],
    tint_types: [],
    misc_options: [],
  },
  {
    id: "24",
    name: "Quad Arch",
    imageSrc: glassImage,
    alt: "Quad Arch",
    thickness_options: [],
    tint_types: [],
    misc_options: [],
  },
  {
    id: "25",
    name: "Irregular/Any Other Shape",
    imageSrc: glassImage,
    alt: "Irregular/Any Other Shape",
    thickness_options: [],
    tint_types: [],
    misc_options: [],
  },
];

export const inchRange = Array.from({ length: 96 }, (_, i) => i + 1);

export const fractionRange = [
  "1 / 16",
  "1 / 8",
  "3 / 16",
  "1 / 4",
  "5 / 16",
  "3 / 8",
  "7 / 16",
  "1 / 2",
  "9 / 16",
  "5 / 8",
  "11 / 16",
  "3 / 4",
  "13 / 16",
  "7 / 8",
  "15 / 16",
];

// hard code vs formatting display string for fraction
export const smallFractionRange = ["⅛", "¼", "½", "⅝", "¾"];

export const thicknessOptions = [
  { id: "1", thickness: 1 / 8 },
  { id: "2", thickness: 5 / 32 },
  { id: "3", thickness: 3 / 16 },
  { id: "4", thickness: 1 / 4 },
  { id: "5", thickness: 3 / 8 },
  { id: "6", thickness: 1 / 2 },
];

export const miscOptions = [
  { id: "1", add_tempered_logo: true },
  { id: "2", add_tempered_logo: false },
  { id: "3", add_tempered_logo: true },
  { id: "4", add_tempered_logo: false },
];

export const tintOptions = [
  {
    id: "1",
    name: "Clear",
    description: "Clear Glass",
    imageSrc: glassImage,
    alt: "Clear Glass",
  },
  {
    id: "2",
    name: "Solex",
    description: "Green Tinted Glass",
    imageSrc: glassImage,
    alt: "Green Tinted Glass",
  },
  {
    id: "3",
    name: "Bronze",
    description: "Bronze Tinted Glass",
    imageSrc: glassImage,
    alt: "Bronze Tinted Glass",
  },
  {
    id: "4",
    name: "Light Gray",
    description: "Light Gray Tinted Glass",
    imageSrc: glassImage,
    alt: "Light Gray Tinted Glass",
  },
  {
    id: "5",
    name: "Dark Gray",
    description: "Dark Gray Tinted Glass",
    imageSrc: glassImage,
    alt: "Dark Gray Tinted Glass",
  },
  {
    id: "6",
    name: "Satin Etch",
    description: "Satin Etch Glass",
    imageSrc: glassImage,
    alt: "Satin Etch Glass",
  },
  {
    id: "7",
    name: "P-516",
    description: "P-516 Glass",
    imageSrc: glassImage,
    alt: "P-516 Glass",
  },
  {
    id: "8",
    name: "Mistlite",
    description: "Mistlite Glass",
    imageSrc: glassImage,
    alt: "Mistlite Glass",
  },
  {
    id: "9",
    name: "Low-E",
    description: "Low-E Glass",
    imageSrc: glassImage,
    alt: "Low-E Glass",
  },
  {
    id: "10",
    name: "Frosted Blue Chip",
    description: "Frosted Blue Chip Glass",
    imageSrc: glassImage,
    alt: "Frosted Blue Chip Glass",
  },
  {
    id: "11",
    name: "Frosted Green Chip",
    description: "Frosted Green Chip Glass",
    imageSrc: glassImage,
    alt: "Frosted Green Chip Glass",
  },
  {
    id: "12",
    name: "Midnight Gray",
    description: "Midnight Gray Glass",
    imageSrc: glassImage,
    alt: "Midnight Gray Glass",
  },
  {
    id: "13",
    name: "Ultra Clear",
    description: "Ultra Clear Glass",
    imageSrc: glassImage,
    alt: "Ultra Clear Glass",
  }
];

export const glassTypes = [
  {
    title: "Annealed Glass",
    description: "Standard glass type used in various applications.",
    imageSrc: glassImage,
    alt: "Annealed Glass",
    id: "12345324",
  },
  {
    title: "Tempered Glass",
    description: "Stronger and safer glass type, ideal for doors and windows.",
    imageSrc: glassImage,
    alt: "Tempered Glass",
    id: "56345",
  },
  {
    title: "Laminated Glass",
    description:
      "Glass with a plastic layer for extra security and soundproofing.",
    imageSrc: glassImage,
    alt: "Laminated Glass",
    id: "95678490",
  },
  {
    title: "Annealed Glass",
    description: "Standard glass type used in various applications.",
    imageSrc: glassImage,
    alt: "Annealed Glass",
    id: "946134669",
  },
  {
    title: "Tempered Glass",
    description: "Stronger and safer glass type, ideal for doors and windows.",
    imageSrc: glassImage,
    alt: "Tempered Glass",
    id: "97323784",
  },
];
