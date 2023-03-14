// @ts-nocheck
export const protocol = {
    name: "Wiegman Protocol",
    description: "The Wiegman Protocol is a protocol for treating Lyme Disease.",
    url: "https://www.lymedisease.org/lyme-basics/wiegman-protocol/",
    user: {
        weight: 50,
        unit: 'kg'
    },
    length: 120,
    items: [
        { name: "Apricot Kernels", amount: 6, repeat: 120, stage: 1 },
        { name: "Vitamine B12", amount: 1, repeat: 120, stage: 1},
        { name: "Essential Amino Acids", amount: 1, repeat: 120, stage: 1},
        { name: "Cherry Bark Extract", amount: 1, repeat: 120, stage: 1},
        { name: "Ivermecting", amount: "3mg", interval: 10, repeat: 4, stage: 1},
        { name: "Minocyclin", amount: protocol.user.weight + 'mg', interval: 2, repeat: 30, offset: 0, stage: 2},
        { name: "Tinidazole", amount: (protocol.user.weight * 2) + 'mg', interval: 2, repeat: 30, offset: 1, stage: 2},
        { name: "Tribiotic", amount: 2, interval: 1, duration: 30, offset: 0, stage: 3},

    ],
    helpers: [
        { name: "Fluconazole", symptoms: ["Candida", "yeast", "sopp"]},
        { name: "Probiotics", symptoms: []}
    ],
    stages: []
}