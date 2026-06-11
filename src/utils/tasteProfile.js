export function generateHighlights(liked, superLiked) {
  const all = [...superLiked, ...liked];
  const categoryCount = {};
  const tagCount = {};
  
  all.forEach((food) => {
    if (food.category) {
      const cat = food.category.toLowerCase();
      categoryCount[cat] = (categoryCount[cat] || 0) + 1;
    }
    if (food.tags) {
      food.tags.forEach((t) => {
        const tag = t.toLowerCase();
        tagCount[tag] = (tagCount[tag] || 0) + 1;
      });
    }
  });

  const highlights = [];
  
  if ((categoryCount["protein"] || 0) >= 2) {
    highlights.push({ emoji: "🥩", label: "Protein Power" });
  }
  if ((categoryCount["vegetable"] || 0) >= 2) {
    highlights.push({ emoji: "🥬", label: "Veggie Lover" });
  }
  if ((categoryCount["carb"] || 0) >= 2) {
    highlights.push({ emoji: "🍝", label: "Carb Enthusiast" });
  }
  if ((tagCount["plant-based"] || 0) >= 1 || (tagCount["vegan"] || 0) >= 1) {
    highlights.push({ emoji: "🌱", label: "Plant-Powered" });
  }
  if ((tagCount["fish"] || 0) >= 1 || (tagCount["seafood"] || 0) >= 1) {
    highlights.push({ emoji: "🐟", label: "Seafood Lover" });
  }
  if ((tagCount["healthy"] || 0) >= 2) {
    highlights.push({ emoji: "🥗", label: "Clean Eater" });
  }
  if ((tagCount["comfort"] || 0) >= 2) {
    highlights.push({ emoji: "🍕", label: "Comfort Fan" });
  }
  if ((tagCount["dairy"] || 0) >= 1) {
    highlights.push({ emoji: "🧀", label: "Dairy Fan" });
  }

  let result = highlights.slice(0, 3);

  const defaultFallbacks = [
    { emoji: "🍽️", label: "Foodie" },
    { emoji: "🌍", label: "Adventurous" },
    { emoji: "✨", label: "Unique Taste" },
  ];
  for (const fb of defaultFallbacks) {
    if (result.length < 3 && !result.some((h) => h.label === fb.label)) {
      result.push(fb);
    }
  }

  return result;
}

export function generateLifestyle(liked) {
  const traits = [];
  const hasHealthy = liked.some((f) => (f.tags || []).includes("healthy"));
  const hasProtein = liked.some((f) => f.category === "protein");
  const hasVeggie = liked.some((f) => f.category === "vegetable");
  const hasPlantBased = liked.some((f) => (f.tags || []).includes("plant-based"));

  if (hasHealthy) traits.push("Clean & Wholesome Focus");
  if (hasProtein) traits.push("High Protein Athletic Goal");
  if (hasVeggie) traits.push("Rich Micronutrient Diet");
  if (hasPlantBased) traits.push("Plant-Forward Lifestyle");
  traits.push("PCOS & GI Diet Friendly");

  return traits.slice(0, 4);
}

export function generateCuisines(liked, superLiked, availableCuisines = []) {
  const all = [...superLiked, ...liked];
  const cuisineScore = {};
  
  availableCuisines.forEach((c) => {
    cuisineScore[c.name] = 0;
  });

  const cuisineTagMap = {
    Italian: ["italian"],
    Mexican: ["mexican"],
    Japanese: ["japanese"],
    Mediterranean: ["mediterranean", "fish", "omega-3", "salad", "seafood", "shellfish"],
    American: ["american", "burger", "steak", "potatoes", "comfort", "red-meat"],
  };

  all.forEach((food) => {
    const tags = food.tags || [];
    availableCuisines.forEach((c) => {
      const matchTags = cuisineTagMap[c.name] || [c.name.toLowerCase()];
      const hasMatch = tags.some((tag) => matchTags.includes(tag.toLowerCase()));
      if (hasMatch) {
        cuisineScore[c.name] += 1;
      }
    });
  });

  return availableCuisines
    .map((c) => ({ ...c, score: cuisineScore[c.name] }))
    .filter((c) => c.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}
