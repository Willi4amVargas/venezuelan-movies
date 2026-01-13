import type { IUser } from "@/context/UserContext";
import { Link } from "react-router";

export function AdminDashboard({ user }: { user: IUser }) {
  return (
    <>
      <section className="p-4 md:p-8 w-full">
        <h2 className="text-3xl font-extrabold mb-6 tracking-tight border-b pb-2 flex flex-col">
          <span>👑 Panel de Administrador</span>
          <b className="text-sm pt-2 text-black/50">
            <i>{user.user.email}</i>
          </b>
        </h2>
        <div>
          <p>
            Bienvenido al panel de administrador. Aquí puedes gestionar el
            sistema y supervisar las actividades de los usuarios.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-5 mt-6">
          {/* <Link
            to={"/user/admin/users"}
            className="p-4 border rounded-lg shadow hover:shadow-lg transition bg-slate-200/80"
          >
            <h3 className="text-xl font-semibold mb-2">Gestión de Usuarios</h3>
            <p>
              Revisa y administra los usuarios registrados en la plataforma.
            </p>
          </Link> */}
          <Link
            to={"/user/admin/movies"}
            className="p-4 border rounded-lg shadow hover:shadow-lg transition bg-slate-200/80"
          >
            <h3 className="text-xl font-semibold mb-2">
              Revisión de Contenido
            </h3>
            <p>Aprobar o rechazar películas solicitadas por los usuarios.</p>
          </Link>
          {/* <div className="p-4 border rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Estadísticas</h3>
            <p>
              Visualiza estadísticas sobre el uso de la plataforma y el
              contenido.
            </p>
          </div>
          <div className="p-4 border rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">
              Configuración del Sistema
            </h3>
            <p>Modifica las configuraciones globales de la plataforma.</p>
          </div> */}
        </div>
      </section>
    </>
  );
}
