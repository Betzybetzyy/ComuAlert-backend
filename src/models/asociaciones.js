import Usuario from "./usuario.js";
import Domicilio from "./domicilio.js";
import Alerta from "./alerta.js";
import Vehiculo from "./vehiculo.js";
import Visita from "./visita.js";
import Visitante from "./visitante.js";
import Usuario_domicilio from "./usuarioDomicilio.js";

Alerta.belongsTo(Usuario, { foreignKey: "Usuario_id" });
Vehiculo.belongsTo(Usuario, { foreignKey: "Usuario_id" });
Visitante.belongsTo(Usuario, { foreignKey: "Usuario_id" });
Visita.belongsTo(Visitante, { foreignKey: 'Visitante_id' });
Domicilio.belongsToMany(Usuario, { through: Usuario_domicilio });
Usuario.belongsToMany(Domicilio, { through: Usuario_domicilio });


export { Usuario, Domicilio, Alerta, Vehiculo, Visita, Visitante,Usuario_domicilio };
