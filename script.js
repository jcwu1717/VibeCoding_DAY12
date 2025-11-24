document.addEventListener("DOMContentLoaded", function () {
  const calcBtn = document.getElementById("calcBtn");
  const dogBirthInput = document.getElementById("dogBirth");
  const resultEl = document.getElementById("result");

  // --- 頁面載入時自動讀取 localStorage ---
  const savedBirth = localStorage.getItem("dogBirth");
  const savedHumanAge = localStorage.getItem("humanAge");

  if (savedBirth) {
    dogBirthInput.value = savedBirth;
  }

  if (savedHumanAge) {
    resultEl.textContent = `狗狗目前大約相當於人類 ${savedHumanAge} 歲。（已載入先前紀錄）`;
  }

  // --- 計算按鈕 ---
  calcBtn.addEventListener("click", function () {
    const birthDateStr = dogBirthInput.value;
    if (!birthDateStr) {
      resultEl.textContent = "請先選擇狗狗的出生日期。";
      return;
    }

    const birthDate = new Date(birthDateStr);
    const today = new Date();

    if (birthDate > today) {
      resultEl.textContent = "出生日期不能晚於今天。";
      return;
    }

    const diffMs = today - birthDate;
    const diffYears = diffMs / (1000 * 60 * 60 * 24 * 365.25);

    if (diffYears <= 0) {
      resultEl.textContent = "狗狗年齡計算有誤。";
      return;
    }

    // 使用公式：Human age = 16 * ln(dogAge) + 31
    const humanAge = 16 * Math.log(diffYears) + 31;
    const humanAgeRounded = Math.round(humanAge * 10) / 10;

    resultEl.textContent = `狗狗目前大約相當於人類 ${humanAgeRounded} 歲。`;

    // --- 將資料存入 localStorage ---
    localStorage.setItem("dogBirth", birthDateStr);
    localStorage.setItem("humanAge", humanAgeRounded);
  });
});
