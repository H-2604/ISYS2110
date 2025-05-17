const timelineData = [
  {
    date: "Today - May 8th 2025",
    events: [
      { time: "13:00", text: "Mission A Executed", icon: "check" },
      { time: "14:12", text: "Mission B Allocated", icon: "clipboard" },
      { time: "16:33", text: "Inventory Restocking Due", icon: "box" },
      { time: "18:47", text: "7 Jockey units Allocated to Rainavia", icon: "shield" },
      { time: "21:22", text: "Pat sent a message", icon: "message" },
    ]
  },
  {
    date: "Yesterday - May 7th 2025",
    events: [
      { time: "10:00", text: "Mission Briefing Completed", icon: "check" },
      { time: "12:30", text: "Medical Supplies Allocated", icon: "clipboard" },
      { time: "15:00", text: "Inventory Check", icon: "box" },
      { time: "17:20", text: "Security Drill", icon: "shield" },
      { time: "20:10", text: "Sam sent a message", icon: "message" },
    ]
  },
  {
    date: "2 Days Ago - May 6th 2025",
    events: [
      { time: "09:15", text: "Mission C Executed", icon: "check" },
      { time: "11:45", text: "Mission D Allocated", icon: "clipboard" },
      { time: "14:30", text: "Inventory Restocking Due", icon: "box" },
      { time: "16:50", text: "5 Jockey units Allocated to Norvia", icon: "shield" },
      { time: "19:00", text: "Alex sent a message", icon: "message" },
    ]
  },
  {
    date: "3 Days Ago - May 5th 2025",
    events: [
      { time: "08:00", text: "Mission E Executed", icon: "check" },
      { time: "10:22", text: "Mission F Allocated", icon: "clipboard" },
      { time: "13:10", text: "Inventory Restocking Due", icon: "box" },
      { time: "15:30", text: "3 Jockey units Allocated to Valtor", icon: "shield" },
      { time: "18:40", text: "Jamie sent a message", icon: "message" },
    ]
  },
];

const icons = {
  check: `<i data-lucide="check" class="w-5 h-5 text-[#ffe066]"></i>`,
  clipboard: `<i data-lucide="clipboard" class="w-5 h-5 text-[#ffe066]"></i>`,
  box: `<i data-lucide="box" class="w-5 h-5 text-[#ffe066]"></i>`,
  shield: `<i data-lucide="shield" class="w-5 h-5 text-[#ffe066]"></i>`,
  message: `<i data-lucide="message-square" class="w-5 h-5 text-[#ffe066]"></i>`,
};

document.addEventListener('DOMContentLoaded', function() {
  const timeline = document.getElementById('timeline-scroll');
  timeline.innerHTML = ''; // Clear any existing content

  timelineData.forEach((day, idx) => {
    const card = document.createElement('div');
    card.className = "timeline-card bg-[#0b5c6b] rounded-3xl shadow-lg p-3 w-[400px] h-[380px] mb-8 snap-center";
    card.innerHTML = `
      <div class="flex items-center mb-1 justify-between">
        <div class="text-[#F0C808] text-base font-bold pixel">${day.date}</div>
        <span class="flex gap-1">
          <span class="w-2 h-2 bg-[#F0C808] rounded-full inline-block"></span>
          <span class="w-2 h-2 bg-[#F0C808] rounded-full inline-block"></span>
          <span class="w-2 h-2 bg-[#F0C808] rounded-full inline-block"></span>
        </span>
      </div>
      <div class="h-1 w-full bg-[#F0C808] mb-2"></div>
      <div class="bg-[#1ca9c9] rounded-xl p-2">
        ${day.events.map(ev => `
          <div class="flex items-center mb-1">
            <span class="text-[#F0C808] mr-2 pixel text-sm">[${ev.time}]</span>
            <span class="text-[#F0C808] flex-1 pixel text-sm">${ev.text}</span>
            <span>${icons[ev.icon]}</span>
          </div>
        `).join('')}
      </div>
    `;
    timeline.appendChild(card);
  });
});
