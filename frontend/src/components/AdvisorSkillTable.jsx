import "../styles/table.css";

function AdvisorSkillTable({ datos = [] }) {
  const skillSections = [
    { key: "inbound", label: "Inbound/Entrante" },
    { key: "google", label: "Google" },
    { key: "facebook", label: "Facebook" },
  ];

  const normalizeSkill = (skill = "") => {
    const value = String(skill).trim().toLowerCase();

    if (value.includes("inbound") || value.includes("entrante")) {
      return "inbound";
    }

    if (value.includes("google")) {
      return "google";
    }

    if (value.includes("facebook")) {
      return "facebook";
    }

    return "";
  };

  console.table(tm);
  console.table(tt);

  return (
    <div className="advisor-skill-tables">
      {skillSections.map(({ key, label }) => {
        const registros = datos.filter(
          (registro) => normalizeSkill(registro.skill) === key
        );

        return (
          <section key={key} className="advisor-skill-section">
            <h3>{label}</h3>

            <table className="advisor-table">
              <thead>
                <tr>
                  <th>Turno</th>
                  <th>ID</th>
                  <th>Asesor</th>
                  <th>Dto</th>
                  <th>Ventas</th>
                  <th>Horas</th>
                </tr>
              </thead>

              <tbody>
                {registros.length > 0 ? (
                  registros.map((registro, index) => (
                    <tr key={`${key}-${registro.idAsesor || index}`}>
                      <td>{registro.turno}</td>
                      <td>{registro.idAsesor}</td>
                      <td>{registro.nombreAsesor}</td>
                      <td>{registro.dto}</td>
                      <td>{registro.ventas}</td>
                      <td>{registro.horas}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">No hay registros</td>
                  </tr>
                )}
              </tbody>
            </table>
          </section>
        );
      })}
    </div>
  );
}

export default AdvisorSkillTable;