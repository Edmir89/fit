// BANCO DE DADOS DOS PERSONAGENS PERSONOWFIT
// Para adicionar um novo personagem, insira um novo objeto no final deste array.

const CORES_EDITORIAS = {
  "Institucional": "#12332A",
  "Educativo": "#5B8DEF",
  "Relacionamento": "#D96C5F",
  "Inspiração": "#F7F4EA",
  "Prova social": "#E7F3EC",
  "Aquisição": "#12332A"
};

const ELENCO = [
  {
    id: "bruno",
    genero: "m",
    nome: "Bruno",
    idade: 35,
    identidade: "Homem pardo brasileiro, pele bronzeada, cabelo cacheado curto, porte atlético.",
    vibe: "Foco, disciplina e energia.",
    editorias: ["Institucional", "Educativo", "Aquisição"],
    en: "A 35-year-old man with tanned skin (medium-dark tone), an athletic build, and a height of 1.80m. He has short, curly hair (growing out), thick eyebrows, a broad nose, medium-sized lips, and large, light-brown eyes. His skin has a light texture, with visible pores and a few scattered light-colored moles. There is a gap in the outer tail of his left eyebrow. He has a square, well-defined face with prominent cheekbones, broad shoulders, defined abs, and a sculpted chest. There is fine body hair on his arms and legs. He is wearing a thermal t-shirt (color #12332A), black shorts, and unbranded white athletic sneakers. He wears a round-faced smartwatch on the same hand as his wedding band, along with a thin silver necklace.",
    fotos: [
      "./img/bruno-close-up.jpeg",
      "./img/bruno-frente.jpeg",
      "./img/bruno-costas.jpeg"
    ]
  },
  {
    id: "paula",
    genero: "f",
    nome: "Paula",
    idade: 28,
    identidade: "Mulher branca brasileira, pele clara levemente bronzeada, cabelo cacheado na altura do pescoço.",
    vibe: "Proximidade, determinação e ritmo.",
    editorias: ["Educativo", "Relacionamento", "Aquisição"],
    en: "A 28-year-old woman with light, slightly tanned skin, an athletic build, and a height of 1.70 m. She has neck-length curly hair, well-groomed eyebrows with a medium arch, a slender upturned nose, full lips, and large brown eyes. Her skin has a natural texture, showing some fine lines and visible pores. She has a diamond-shaped face with defined, rosy cheekbones. She displays broad shoulders, defined abs, and a toned torso. Short, fine, light, and sparse body hair is visible where the light hits. She is wearing a plain 'Now Green' sports top, 'Deep Green' leggings, and white sneakers with 'Deep Green' accents (no visible brand logos). She wears a square smartwatch, a thin gold chain necklace with a cross pendant, and a small gold stud piercing in her nose.",
    fotos: [
      "./img/paula-close-up.jpeg",
      "./img/paula-frente.jpeg",
      "./img/paula-costas.jpeg"
    ]
  },
  {
    id: "miria",
    genero: "f",
    nome: "Miriã",
    idade: 32,
    identidade: "Mulher negra brasileira, pele retinta com brilho natural, rosto oval, olhos amendoados.",
    vibe: "Serenidade, elegância e consistência.",
    editorias: ["Institucional", "Inspiração", "Prova social"],
    en: "The woman has rich, deep-toned skin with visible natural texture: fine pores, subtle imperfections, and a soft, natural (non-oily) glow, especially on her forehead and cheekbones. Her features include dark brown, almond-shaped eyes with defined black lashes; well-groomed, naturally shaped eyebrows; a proportionate nose with a defined bridge and slightly rounded tip; full, natural lips with a soft pinkish hue; and an oval face. She is wearing an emerald-green athletic set: an asymmetrical, one-shoulder top with clean seams and high-waisted, high-performance technical knit shorts. The shorts feature precise stitching at the high waistband. The fabric is a fine-knit technical material with visible, detailed overlock stitching. She wears gray textile-knit running shoes with white soles and laces. Her accessories include a smartwatch with a silicone band on her left wrist and a delicate, thin gold anklet on her left ankle.",
    fotos: [
      "./img/miria-close-up.jpeg",
	"./img/miria-frente.jpeg",
	"./img/miria-costas.jpeg"
    ]
  }
];