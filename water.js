document.addEventListener("DOMContentLoaded", () => {
  const nameInput = document.querySelector("#nameInput")
  const ageInput = document.querySelector("#ageInput")
  const saveUserBtn = document.querySelector(".save-user-btn")
  const saveButton = document.querySelector("#saveButton")
  const resetButton = document.querySelector("#resetButton")
  const weeklyContainer = document.querySelector("#weeklyContainer")
  const todayProgressValue = document.querySelector("#todayProgressValue")
  const todayProgressBar = document.querySelector("#todayProgressBar")
  const weeklyAverageValue = document.querySelector("#weeklyAverageValue")
  const completionRateValue = document.querySelector("#completionRateValue")
  const weeklySummaryText = document.querySelector("#weeklySummaryText")
  const recommendedGlassesText = document.querySelector("#recommendedGlasses")
  const notificationDiv = document.querySelector("#notification")

  const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  const GOAL_GLASSES = 8

  loadAllData()
  renderWeeklyTracker()
  updateStatistics()

  saveUserBtn.addEventListener("click", saveUserInfo)
  nameInput.addEventListener("input", saveUserInfo)
  ageInput.addEventListener("input", updateRecommendation)
  saveButton.addEventListener("click", saveWeeklyProgress)
  resetButton.addEventListener("click", resetWeek)

  function getWeeklyData() {
    const saved = localStorage.getItem("weeklyWaterData")
    if (!saved) {
      const newWeekData = {}
      DAYS_OF_WEEK.forEach((day) => {
        newWeekData[day] = 0
      })
      return newWeekData
    }
    return JSON.parse(saved)
  }

  function saveWeeklyData(weekData) {
    localStorage.setItem("weeklyWaterData", JSON.stringify(weekData))
  }

  function getTodayName() {
    const today = new Date()
    return DAYS_OF_WEEK[today.getDay() === 0 ? 6 : today.getDay() - 1]
  }

  function renderWeeklyTracker() {
    weeklyContainer.innerHTML = ""
    const weekData = getWeeklyData()
    const today = getTodayName()

    DAYS_OF_WEEK.forEach((day) => {
      const glassCount = weekData[day] || 0
      const dayRow = document.createElement("div")
      dayRow.className = "day-row"

      if (day === today) {
        dayRow.classList.add("today")
      }

      if (glassCount < 4) {
        dayRow.classList.add("red")
      } else if (glassCount >= 4 && glassCount < 8) {
        dayRow.classList.add("orange")
      } else if (glassCount >= 8) {
        dayRow.classList.add("green")
      }

      let glassesHTML = ""
      for (let i = 0; i < 8; i++) {
        const isChecked = i < glassCount ? "checked" : ""
        glassesHTML += `
          <div class="glass-checkbox ${isChecked}" data-day="${day}" data-glass-index="${i}"></div>
        `
      }

      dayRow.innerHTML = `
        <div class="day-label">${day}</div>
        <div class="daily-progress">${glassCount} / 8</div>
        <div class="water-glasses">${glassesHTML}</div>
      `

      weeklyContainer.appendChild(dayRow)
    })

    addGlassClickListeners()
  }

  function addGlassClickListeners() {
    const glassCheckboxes = document.querySelectorAll(".glass-checkbox")

    glassCheckboxes.forEach((glass) => {
      glass.addEventListener("click", () => {
        const day = glass.getAttribute("data-day")
        const glassIndex = Number.parseInt(glass.getAttribute("data-glass-index"))
        const weekData = getWeeklyData()

        weekData[day] = glassIndex + 1

        saveWeeklyData(weekData)
        renderWeeklyTracker()
        updateStatistics()

        if (weekData[day] >= 8) {
          const dayRow = document.querySelector(`.day-row:has([data-day="${day}"])`)
          if (dayRow) {
            dayRow.classList.add("pulse")
            setTimeout(() => dayRow.classList.remove("pulse"), 600)
            showNotification("🎉 Daily goal reached!")
          }
        }
      })
    })
  }

  function updateStatistics() {
    const weekData = getWeeklyData()
    const today = getTodayName()
    const todayGlasses = weekData[today] || 0

    const todayPercent = (todayGlasses / GOAL_GLASSES) * 100
    todayProgressValue.textContent = `${todayGlasses} / ${GOAL_GLASSES}`
    todayProgressBar.style.width = Math.min(todayPercent, 100) + "%"

    const totalGlasses = Object.values(weekData).reduce((sum, count) => sum + count, 0)
    const weeklyAverage = (totalGlasses / 7).toFixed(1)
    weeklyAverageValue.textContent = weeklyAverage

    const completedDays = Object.values(weekData).filter((count) => count >= 8).length
    const completionRate = Math.round((completedDays / 7) * 100)
    completionRateValue.textContent = `${completionRate}%`

    weeklySummaryText.textContent = `📊 This Week: ${totalGlasses} glasses | Average: ${weeklyAverage} glasses/day | Goal Days: ${completedDays}/7`
  }

  function saveUserInfo() {
    const userData = {
      name: nameInput.value,
      age: ageInput.value,
    }
    localStorage.setItem("userInfo", JSON.stringify(userData))
    showNotification("✅ User info saved!")
    updateRecommendation()
  }

  function updateRecommendation() {
    const age = Number.parseInt(ageInput.value) || 0
    let recommendedGlasses = 8

    if (age >= 4 && age <= 8) {
      recommendedGlasses = 5
    } else if (age > 8 && age <= 13) {
      recommendedGlasses = 6
    } else if (age > 13 && age <= 18) {
      recommendedGlasses = 9
    } else if (age > 18 && age <= 64) {
      recommendedGlasses = 8
    } else if (age >= 65) {
      recommendedGlasses = 8
    }

    recommendedGlassesText.textContent = recommendedGlasses
  }

  function saveWeeklyProgress() {
    const weekData = getWeeklyData()
    const backup = {
      timestamp: new Date().toLocaleString(),
      data: weekData,
    }

    const backups = JSON.parse(localStorage.getItem("weeklyBackups")) || []
    backups.push(backup)
    localStorage.setItem("weeklyBackups", JSON.stringify(backups))

    showNotification("💾 Progress saved successfully!")
  }

  function resetWeek() {
    const confirmed = confirm("Are you sure you want to reset this week's data? This cannot be undone.")
    if (!confirmed) return

    const emptyWeek = {}
    DAYS_OF_WEEK.forEach((day) => {
      emptyWeek[day] = 0
    })

    saveWeeklyData(emptyWeek)
    renderWeeklyTracker()
    updateStatistics()
    showNotification("🔄 Week has been reset!")
  }

  function loadAllData() {
    const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {}
    nameInput.value = userInfo.name || ""
    ageInput.value = userInfo.age || ""
    updateRecommendation()
  }

  function showNotification(message) {
    notificationDiv.textContent = message
    notificationDiv.style.display = "block"
    setTimeout(() => {
      notificationDiv.style.display = "none"
    }, 3000)
  }
})
