// 1️⃣ 從網址讀 uid
const params = new URLSearchParams(window.location.search);
const uid = params.get("uid");

// 2️⃣ 沒 uid 就顯示錯誤
if (!uid) {
  document.body.innerHTML = "❌ 缺少 uid 參數";
  throw new Error("Missing uid");
}

// 3️⃣ 組出 JSON 路徑
const jsonPath = `cards/cards_${uid}.json`;

// 4️⃣ fetch 對應玩家的卡牌資料
fetch(jsonPath)
  .then(res => {
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    return res.json();
  })
  .then(data => {
    // 標題
    document.getElementById("title").textContent =
      `🎴 ${data.username} 的卡牌收藏`;

    const container = document.getElementById("card-container");
    container.innerHTML = "";

    // 5️⃣ 顯示卡牌
    data.cards.forEach(card => {
      const div = document.createElement("div");
      div.className = `card rank-${card.rank.replace("+", "plus")}`;

      div.innerHTML = `
        <img src="${card.image}" loading="lazy">
        <p>${card.name}</p>
        <small>${card.rank}</small>
      `;

      container.appendChild(div);
    });
  })
  .catch(err => {
    console.error(err);
    document.body.innerHTML = "❌ 找不到這位玩家的卡牌資料";
  });

