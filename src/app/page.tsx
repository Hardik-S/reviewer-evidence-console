import {
  evidenceItems,
  generatePacket,
  packetMetrics,
  riskFlags
} from "@/lib/evidence";

const packet = generatePacket(evidenceItems);
const metrics = packetMetrics(evidenceItems);

const statusClass: Record<string, string> = {
  verified: "statusVerified",
  watch: "statusWatch",
  missing: "statusMissing"
};

export default function Home() {
  return (
    <main className="shell">
      <section className="hero">
        <div className="heroCopy">
          <p className="sectionLabel">Portfolio proof workflow</p>
          <h1>Reviewer Evidence Console</h1>
          <p className="heroText">
            Convert scattered PR, test, deploy, screenshot, and decision notes
            into a concise proof packet a technical reviewer can inspect in
            minutes.
          </p>
        </div>
        <div className="packetPreview" aria-label="Proof packet summary">
          <span className="previewLabel">Packet readiness</span>
          <strong>{metrics.verifiedCount}/{metrics.totalCount}</strong>
          <span>evidence points verified</span>
        </div>
      </section>

      <section className="dashboard" aria-label="Evidence dashboard">
        <div className="evidenceList">
          <div className="sectionHeader">
            <p className="sectionLabel">Source evidence</p>
            <h2>What the packet can prove</h2>
          </div>
          <div className="cards">
            {evidenceItems.map((item) => (
              <article className="evidenceCard" key={item.id}>
                <div>
                  <span className={`status ${statusClass[item.status]}`}>
                    {item.status}
                  </span>
                  <h3>{item.title}</h3>
                </div>
                <p>{item.summary}</p>
                <dl>
                  <div>
                    <dt>Source</dt>
                    <dd>{item.source}</dd>
                  </div>
                  <div>
                    <dt>Reviewer value</dt>
                    <dd>{item.reviewerValue}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </div>

        <aside className="packetPanel" aria-label="Generated proof packet">
          <div className="sectionHeader">
            <p className="sectionLabel">Generated packet</p>
            <h2>Markdown handoff</h2>
          </div>
          <pre>{packet}</pre>
          <div className="riskBox">
            <h3>Risk flags</h3>
            <ul>
              {riskFlags(evidenceItems).map((flag) => (
                <li key={flag}>{flag}</li>
              ))}
            </ul>
          </div>
        </aside>
      </section>
    </main>
  );
}
