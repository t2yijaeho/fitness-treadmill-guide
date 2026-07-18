"use client";

import { useState } from "react";

const routines = [
  {
    id: "easy",
    label: "리셋 워크",
    time: "20분",
    speed: "4.8 km/h",
    incline: "1%",
    note: "대화가 가능한 편안한 걸음으로 몸을 깨웁니다.",
  },
  {
    id: "steady",
    label: "스테디 런",
    time: "30분",
    speed: "7.2 km/h",
    incline: "1%",
    note: "호흡은 차분하게, 자세는 길게 유지해 보세요.",
  },
  {
    id: "climb",
    label: "파워 클라임",
    time: "25분",
    speed: "5.6 km/h",
    incline: "5–8%",
    note: "속도보다 보폭과 엉덩이의 힘에 집중합니다.",
  },
];

const consoleDisplays = [
  { label: "TIME", value: "시간", text: "운동 경과 시간 또는 설정한 목표 시간입니다. 프로그램이 끝나면 총 운동 시간을 보여줍니다." },
  { label: "SPEED", value: "속도", text: "현재 벨트 속도입니다. 시설 설정에 따라 mph 또는 km/h로 표시될 수 있습니다." },
  { label: "KCAL / METS", value: "에너지", text: "소모 열량(KCAL)과 현재 운동 강도(METS)를 번갈아 표시합니다. 열량은 입력 체중 등을 바탕으로 한 추정치입니다." },
  { label: "HEART RATE", value: "심박수", text: "손잡이 센서를 잡거나 호환 심박 벨트를 착용하면 BPM으로 표시됩니다." },
  { label: "PROFILE", value: "코스", text: "중앙의 점선 트랙은 프로그램 진행과 앞으로 올 속도·경사 변화를 보여줍니다. 1바퀴는 0.25 mile 또는 400 m 기준입니다." },
  { label: "HEART RATE ZONES", value: "심박 구간", text: "나이별 목표 심박 구간을 빠르게 참고하는 표입니다. 의료 조언이나 개인 처방을 대신하지는 않습니다." },
];

const buttonGuides = [
  { group: "운동 시작 · 종료", items: [
    ["QUICK START / RESUME", "기본 설정으로 벨트를 시작하거나, 일시정지한 운동을 다시 시작합니다."],
    ["STOP / PAUSE", "한 번 누르면 일시정지, 다시 누르면 운동을 종료합니다. 벨트가 멈출 때까지 내려오지 마세요."],
    ["FAN · OFF / LOW / HIGH", "콘솔 왼쪽의 개인 팬을 끄거나 약·강으로 조절합니다."],
  ] },
  { group: "즉시 조절", items: [
    ["SPEED + / −", "속도를 작은 단위로 올리거나 내립니다. 숫자 키로 값을 입력한 뒤 OK를 눌러 바로 지정할 수도 있습니다."],
    ["INCLINE + / −", "경사를 올리거나 내립니다. 프로그램 중에도 조절 가능하지만 발 디딤이 안정된 뒤 사용하세요."],
    ["숫자 키패드 0–9", "체중·시간·나이·목표값을 입력할 때 사용합니다. 일부 운동 중에는 강도 값을 바로 지정하는 데도 쓰입니다."],
    ["← / OK", "←는 입력을 고치거나 이전 단계로, OK는 화면에 입력한 값을 확정하고 다음 단계로 진행합니다."],
  ] },
  { group: "프로그램 선택", items: [
    ["MANUAL", "시간만 정해 두고 속도와 경사를 내가 직접 바꾸는 자유 운동입니다."],
    ["BURN CALORIES", "세 번의 강도 피크로 구성된 유산소 프로그램입니다. 체중·시간·최대 속도·최대 경사를 설정합니다."],
    ["INCREASE ENDURANCE", "0% 경사와 낮은 시작 속도에서 출발해, 설정한 최대값까지 점진적으로 올라갑니다."],
    ["ADVANCED WORKOUTS", "심박 훈련, 지방 연소, 체력 테스트, 거리·칼로리 목표 프로그램 등 세부 메뉴로 들어갑니다."],
  ] },
];

const programGuides = [
  {
    id: "manual", label: "MANUAL", kind: "직접 조절", title: "내 페이스로 달리는 자유 운동", color: "lime",
    description: "속도와 경사를 내가 원하는 순간에 바꿀 수 있는 가장 단순한 모드입니다. 워밍업, 일정 페이스 걷기, 짧은 인터벌에 잘 맞습니다.",
    setup: ["MANUAL을 누릅니다.", "필요하면 시간·체중 등 화면의 항목을 입력하고 OK로 확정합니다.", "카운트다운 뒤 SPEED와 INCLINE으로 페이스를 조절합니다."],
    cue: "처음에는 0% 경사와 편안한 보행 속도로 시작하세요.",
  },
  {
    id: "burn", label: "BURN CALORIES", kind: "3-피크", title: "세 번의 강도 피크를 따라가기", color: "coral",
    description: "프로그램이 세 개의 강도 높은 구간을 만들어 주는 방식입니다. 시간, 체중, 최대 속도와 최대 경사를 먼저 입력하면 그 범위 안에서 진행됩니다.",
    setup: ["BURN CALORIES를 누릅니다.", "체중 → 시간 → 최대 속도 → 최대 경사를 차례로 입력하고 매 단계 OK를 누릅니다.", "3초 카운트다운 뒤 시작합니다. 최대값은 안전하게 감당할 수 있는 범위로 정하세요."],
    cue: "목표는 ‘가장 빠른 값’이 아니라 끝까지 유지할 수 있는 상한선입니다.",
  },
  {
    id: "endurance", label: "INCREASE ENDURANCE", kind: "점진 상승", title: "끝까지 조금씩 올라가는 지구력 운동", color: "blue",
    description: "낮은 속도와 0% 경사로 시작해 설정한 최대 속도·경사까지 선형으로 증가합니다. 급격한 시작보다 긴 호흡의 페이스를 만들고 싶을 때 좋습니다.",
    setup: ["INCREASE ENDURANCE를 누릅니다.", "체중 → 시간 → 최대 속도 → 최대 경사를 입력하고 OK로 확정합니다.", "초반은 편안하게, 후반으로 갈수록 자연스럽게 강도가 올라갑니다."],
    cue: "후반에도 자세가 무너지지 않을 정도의 최대값을 선택하세요.",
  },
  {
    id: "advanced", label: "ADVANCED", kind: "세부 메뉴", title: "심박·테스트·목표 기반 운동", color: "orange",
    description: "ADVANCED WORKOUTS는 하나의 운동이 아니라 여러 메뉴의 입구입니다. 콘솔 설정에 따라 심박 훈련, Burn Fat, Fitness Test, Goal Workouts가 제공됩니다.",
    setup: ["ADVANCED WORKOUTS를 누릅니다.", "화면의 선택지에서 원하는 카테고리와 세부 프로그램을 고릅니다.", "안내되는 체중·시간·나이·심박·목표값을 입력하고 OK로 진행합니다."],
    cue: "심박 기반 운동은 손잡이보다 흉부 심박 벨트 사용이 더 안정적일 수 있습니다.",
  },
  {
    id: "custom", label: "CUSTOM", kind: "개인 목표", title: "내가 정한 거리 또는 칼로리 목표", color: "violet",
    description: "Goal Workouts 메뉴가 활성화된 기기에서는 칼로리 목표, 5K·10K 루프, 또는 CUSTOM DISTANCE를 선택할 수 있습니다. CUSTOM DISTANCE는 원하는 거리를 직접 정해 완주하는 방식입니다.",
    setup: ["ADVANCED WORKOUTS → GOAL WORKOUTS로 들어갑니다.", "CALORIES, 5K LOOP, 10K LOOP 또는 CUSTOM DISTANCE를 선택합니다.", "CUSTOM DISTANCE라면 체중과 목표 거리를 입력한 뒤 OK를 눌러 시작합니다."],
    cue: "모든 기기에 같은 세부 메뉴가 있는 것은 아닙니다. 화면에 보이는 메뉴를 우선하세요.",
  },
];

export default function TreadmillGuide({ basePath }: { basePath: string }) {
  const [selected, setSelected] = useState(routines[0]);
  const [effort, setEffort] = useState(4);
  const [activeProgram, setActiveProgram] = useState(programGuides[0]);

  const intensity =
    effort <= 3 ? "회복" : effort <= 6 ? "지구력" : effort <= 8 ? "도전" : "고강도";

  return (
    <main>
      <section className="hero" id="top">
        <nav className="nav container" aria-label="주요 메뉴">
          <a className="brand" href="#top" aria-label="런 레디 홈">
            <span>RUN</span> READY
          </a>
          <div className="nav-links">
            <a href="#start">시작하기</a>
            <a href="#plans">루틴</a>
            <a href="#console">콘솔 안내</a>
            <a href="#advanced">상세 가이드</a>
          </div>
        </nav>

        <div className="hero-grid container">
          <div className="hero-copy">
            <p className="eyebrow">STAR TRAC · QUICK GUIDE</p>
            <h1>걷기부터 달리기까지,<br />오늘의 리듬을 찾으세요.</h1>
            <p className="intro">
              이 트레드밀을 처음 쓰는 날에도 자신 있게. 간단한 세 단계와
              당신의 컨디션에 맞춘 루틴으로 편안하게 시작해요.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#start">3단계로 시작하기 <span>↓</span></a>
              <a className="button button-quiet" href="#plans">오늘의 루틴 고르기</a>
            </div>
            <div className="equipment-detail">
              <span className="pulse" aria-hidden="true" />
              Star Trac 상업용 트레드밀 · 최대 사용자 중량 272 kg
            </div>
          </div>

          <div className="hero-panel" aria-label="오늘의 운동 준비 상태">
            <div className="panel-topline"><span>READY TO MOVE</span><span>01 / 03</span></div>
            <div className="arc" aria-hidden="true"><div className="arc-inner">GO</div></div>
            <div className="panel-data">
              <div><small>권장 시작 속도</small><strong>3.0</strong><span>km/h</span></div>
              <div><small>초보자 경사</small><strong>0–1</strong><span>%</span></div>
            </div>
            <p>천천히 올라서고, 손잡이를 잡은 뒤 시작하세요.</p>
          </div>
        </div>
      </section>

      <section className="quick-strip">
        <div className="container quick-items">
          <p><b>01</b> 몸 상태 확인</p>
          <p><b>02</b> 천천히 출발</p>
          <p><b>03</b> 천천히 마무리</p>
          <span>안전하고 꾸준하게</span>
        </div>
      </section>

      <section className="section container start-section" id="start">
        <div className="section-heading">
          <p className="eyebrow">FIRST STEPS</p>
          <h2>처음 3분이<br />운동 전체를 바꿔요.</h2>
        </div>
        <div className="steps">
          <article className="step-card">
            <span className="step-number">01</span>
            <h3>올라서기 전</h3>
            <p>클립형 안전 키가 제자리에 있는지 확인하고, 발은 벨트 양옆의 발판에 둡니다.</p>
            <span className="step-tag">안전 키 · 발판</span>
          </article>
          <article className="step-card active">
            <span className="step-number">02</span>
            <h3>Quick Start</h3>
            <p>양쪽 손잡이를 잡고 녹색 <b>QUICK START</b>를 누르세요. 벨트가 아주 천천히 움직입니다.</p>
            <span className="step-tag">시작 속도 0.1</span>
          </article>
          <article className="step-card">
            <span className="step-number">03</span>
            <h3>나만의 페이스</h3>
            <p>속도와 경사는 + / − 버튼으로 조금씩 조정하세요. 한 번에 하나만 바꾸면 편합니다.</p>
            <span className="step-tag">작게 · 천천히</span>
          </article>
        </div>
      </section>

      <section className="routine-section" id="plans">
        <div className="container routine-layout">
          <div>
            <p className="eyebrow">PICK YOUR PACE</p>
            <h2>오늘 몸에 맞는<br />한 가지를 고르세요.</h2>
            <p className="section-copy">완벽할 필요 없어요. 운동을 마치고도 “한 번 더 할 수 있겠다”는 느낌이면 충분합니다.</p>
            <div className="routine-list" role="group" aria-label="운동 루틴 선택">
              {routines.map((routine) => (
                <button
                  key={routine.id}
                  className={selected.id === routine.id ? "routine-button selected" : "routine-button"}
                  onClick={() => setSelected(routine)}
                  aria-pressed={selected.id === routine.id}
                >
                  <span>{routine.label}</span><b>{routine.time}</b><i>→</i>
                </button>
              ))}
            </div>
          </div>
          <aside className="routine-card" aria-live="polite">
            <p className="card-label">TODAY&apos;S CARD</p>
            <h3>{selected.label}</h3>
            <div className="routine-metrics">
              <div><span>시간</span><b>{selected.time}</b></div>
              <div><span>속도</span><b>{selected.speed}</b></div>
              <div><span>경사</span><b>{selected.incline}</b></div>
            </div>
            <p>{selected.note}</p>
            <div className="progress-dots"><i /><i /><i /><i /><i /></div>
          </aside>
        </div>
      </section>

      <section className="section container console-section" id="console">
        <div className="console-header">
          <div>
            <p className="eyebrow">YOUR CONSOLE</p>
            <h2>눈에 보이는 버튼부터<br />친해져요.</h2>
          </div>
          <p>사진 속 콘솔 기준으로 꼭 필요한 조작만 골랐어요.</p>
        </div>
        <div className="console-grid">
          <figure className="console-photo">
            <img src={`${basePath}/equipment/star-trac-console.jpg`} alt="Star Trac 트레드밀 콘솔. Quick Start, Stop, 속도 및 경사 조절 버튼이 보인다." />
            <figcaption>사용 중에는 큰 버튼만 기억하세요: 시작 · 정지 · 속도 · 경사</figcaption>
          </figure>
          <div className="console-notes">
            <article><b className="lime">A</b><div><h3>QUICK START / RESUME</h3><p>운동을 바로 시작하거나, 일시정지 뒤 같은 페이스로 돌아갑니다.</p></div></article>
            <article><b className="red">B</b><div><h3>STOP / PAUSE</h3><p>운동을 멈춥니다. 끝낼 때는 속도를 2–3분에 걸쳐 낮춰주세요.</p></div></article>
            <article><b className="blue">C</b><div><h3>SPEED + / −</h3><p>걷기에서 시작해 0.1–0.3 km/h씩만 올려보세요.</p></div></article>
            <article><b className="orange">D</b><div><h3>INCLINE + / −</h3><p>경사는 1%만으로도 체감이 달라집니다. 처음엔 0–1%면 충분해요.</p></div></article>
          </div>
        </div>
      </section>

      <section className="advanced-guide" id="advanced">
        <div className="container">
          <div className="advanced-heading">
            <div><p className="eyebrow">ADVANCED CONSOLE GUIDE</p><h2>모든 버튼과 화면을<br />한 번에 이해하기.</h2></div>
            <p>사진 속 Star Trac 콘솔의 표기와 E-Series 사용 안내를 바탕으로 정리했습니다. 체육관 설정이나 기기 버전에 따라 일부 메뉴·단위는 다를 수 있습니다.</p>
          </div>

          <div className="display-guide">
            <div className="display-guide-title"><span>DISPLAY</span><h3>운동 중 화면 읽기</h3><p>숫자가 무엇을 의미하는지 알면, 페이스를 훨씬 편안하게 조절할 수 있어요.</p></div>
            <div className="display-cards">
              {consoleDisplays.map((display) => <article key={display.label} className="display-card"><p>{display.label}</p><h3>{display.value}</h3><span>{display.text}</span></article>)}
            </div>
          </div>

          <div className="button-guide">
            <div className="button-guide-title"><p className="eyebrow">BUTTON DIRECTORY</p><h3>버튼 사전</h3><p>운동 중에는 큰 시작·정지 버튼부터, 설정할 때는 숫자 키패드와 OK를 사용합니다.</p></div>
            <div className="button-groups">
              {buttonGuides.map((guide) => <section key={guide.group} className="button-group"><h3>{guide.group}</h3>{guide.items.map(([name, description]) => <article key={name}><b>{name}</b><p>{description}</p></article>)}</section>)}
            </div>
          </div>

          <div className="program-guide">
            <div className="program-guide-intro"><p className="eyebrow">PROGRAM PLAYBOOK</p><h3>무엇을 고를지,<br />어떻게 설정할지.</h3><p>아래 탭을 눌러 각 프로그램의 목적과 화면에서 입력할 순서를 확인하세요.</p></div>
            <div className="program-tabs" role="tablist" aria-label="트레드밀 프로그램 선택">
              {programGuides.map((program) => <button key={program.id} role="tab" aria-selected={activeProgram.id === program.id} className={activeProgram.id === program.id ? "program-tab selected" : "program-tab"} onClick={() => setActiveProgram(program)}><span>{program.kind}</span>{program.label}</button>)}
            </div>
            <article className={`program-detail ${activeProgram.color}`} aria-live="polite">
              <div className="program-detail-top"><p>{activeProgram.kind}</p><h3>{activeProgram.title}</h3><span>{activeProgram.label}</span></div>
              <p className="program-description">{activeProgram.description}</p>
              <div className="setup-flow"><h4>설정 순서</h4><ol>{activeProgram.setup.map((step) => <li key={step}>{step}</li>)}</ol></div>
              <div className="program-cue"><span>PACE NOTE</span><p>{activeProgram.cue}</p></div>
            </article>
          </div>

          <div className="guide-footer-note"><b>운동 중 공통 팁</b><span>프로그램 중 속도·경사는 직접 조절할 수 있습니다. 중단하려면 STOP을 한 번, 운동을 끝내려면 STOP을 다시 누르세요. 목표가 끝나면 쿨다운이 시작될 수 있습니다.</span></div>
        </div>
      </section>

      <section className="effort-section">
        <div className="container effort-layout">
          <div>
            <p className="eyebrow">CHECK IN</p>
            <h2>지금의 에너지는<br />어느 정도인가요?</h2>
          </div>
          <div className="effort-control">
            <div className="effort-readout"><span>추천 강도</span><strong>{intensity}</strong><b>{effort}<small>/10</small></b></div>
            <input aria-label="운동 강도" type="range" min="1" max="10" value={effort} onChange={(event) => setEffort(Number(event.target.value))} />
            <div className="range-labels"><span>가볍게</span><span>집중해서</span></div>
            <p>{effort <= 3 ? "오늘은 걷기와 가벼운 스트레칭으로 충분해요." : effort <= 6 ? "숨은 조금 차지만 짧은 문장은 말할 수 있는 수준을 유지해요." : "충분히 워밍업한 뒤, 짧은 구간으로 강도를 올려보세요."}</p>
          </div>
        </div>
      </section>

      <section className="safety-section container">
        <div className="safety-mark">!</div>
        <div><p className="eyebrow">ONE LAST THING</p><h2>어지럽거나 통증이 느껴지면,<br />즉시 멈추세요.</h2></div>
        <p>손잡이를 잡고 STOP을 누른 뒤, 벨트가 완전히 멈춘 것을 확인하고 내려옵니다. 필요한 경우 전문가에게 상담하세요.</p>
      </section>

      <footer className="footer container"><span>RUN READY</span><p>오늘의 한 걸음이 다음 운동을 만듭니다.</p><a href="#top">맨 위로 ↑</a></footer>
    </main>
  );
}
