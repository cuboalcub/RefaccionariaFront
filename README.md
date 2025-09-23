# RodamientosTransmicionesTlalnepantla

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.2.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## The structure for the proyect  

```bash
src/
├── app/
│   ├── core/                         # Servicios y funcionalidades globales
│   │   ├── guards/                   # Guards (auth, roles, etc.)
│   │   ├── interceptors/             # HTTP interceptors (auth, logging)
│   │   ├── services/                 # Servicios compartidos (auth, api, storage)
│   │   ├── models/                   # Interfaces y tipos globales
│   │   └── core.module.ts            # Módulo central
│   │
│   ├── shared/                       # Componentes, pipes, directivas reusables
│   │   ├── components/               # Botones, tablas, modales, etc.
│   │   ├── pipes/                    # Pipes reutilizables (ej. currency, filter)
│   │   ├── directives/               # Directivas personalizadas
│   │   └── shared.module.ts          # Exporta todo lo compartido
│   │
│   ├── features/                     # Cada módulo funcional de la app
│   │   ├── auth/                     # Login, registro, recuperación de contraseña
│   │   │   ├── pages/                # Páginas propias del módulo
│   │   │   ├── components/           # Componentes específicos del módulo
│   │   │   ├── services/             # Servicios del módulo
│   │   │   ├── auth-routing.module.ts
│   │   │   └── auth.module.ts
│   │   │
│   │   ├── sales/                    # Ventas (POS principal)
│   │   │   ├── pages/                # Ej: venta rápida, ticket actual
│   │   │   ├── components/           # Ej: buscador de refacciones, carrito
│   │   │   ├── services/             # Lógica de ventas
│   │   │   ├── sales-routing.module.ts
│   │   │   └── sales.module.ts
│   │   │
│   │   ├── inventory/                # Inventario
│   │   │   ├── pages/                # Ej: listado, altas/bajas
│   │   │   ├── components/           # Ej: formulario de producto
│   │   │   ├── services/             
│   │   │   └── inventory.module.ts
│   │   │
│   │   ├── customers/                # Clientes
│   │   ├── suppliers/                # Proveedores
│   │   ├── reports/                  # Reportes y dashboard
│   │   └── settings/                 # Configuración del sistema
│   │
│   ├── layout/                       # Layouts generales (sidebar, navbar, footer)
│   │   ├── components/               
│   │   └── layout.module.ts
│   │
│   ├── app-routing.module.ts         # Rutas principales (lazy loading)
│   └── app.module.ts
│
├── assets/                           # Imágenes, íconos, etc.
├── environments/                     # env.ts y env.prod.ts
└── main.ts
```
