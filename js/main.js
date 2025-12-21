fetch("cards.json")
  .then(res => res.json())
  .then(data => {
    document.getElementById("title").textContent =
      `🎴 ${data.username} 的卡牌收藏`;

    const container = document.getElementById("card-container");

    data.cards.forEach(card => {
      const div = document.createElement("div");
      div.className = `card rank-${card.rank.replace("+", "plus")}`;

      div.innerHTML = `
        <img src="${card.image}">
        <p>${card.name}</p>
        <small>${card.rank}</small>
      `;

      container.appendChild(div);
    });
  });
