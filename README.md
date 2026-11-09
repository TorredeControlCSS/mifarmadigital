# Mapa Nacional de Disponibilidad de Medicamentos por Unidad Ejecutora

Medicamentos de la Lista Oficial (LOM, 586 renglones, clasificación VEN) en cada Unidad Ejecutora y en los tres CEDIS.
Dirección Nacional de Logística · CSS Panamá. Acceso abierto.

- `index.html`: la página. Lee en vivo los datos que el ecosistema ya publica (REPOSICION_UE_CSS: abastecimiento_red,
  matriz_snapshot, reposicion_resumen, series_saldos_*; SIGUELO_DINALOG: ue_coordenadas, ue_provincias, polygons_provincias).
  No tiene backend propio ni requiere cargar archivos.
- `lom.json`: la Lista Oficial depurada (código, nombre, VEN, sistema, categoría). Se edita solo si cambia la LOM.
- `index_anterior.html` y `data.json`: versión anterior (Mi Farma Digital, datos al 17-07-2026), conservada para volver atrás.
