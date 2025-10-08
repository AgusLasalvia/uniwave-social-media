import { useEffect, useState } from "react";
import "./Activation.css"
// import "../global.css"
export default function Activation({ token }: { token: string }) {
	const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

	useEffect(() => {
		if (!token) {
			setStatus("error");
			return;
		}

		fetch(import.meta.env.PUBLIC_API_URL + "/auth/activate", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ jwt: token }),
		})
			.then((res) => {
				if (res.status !== 200) setStatus("error");
				else setStatus("success");
			})
			.catch(() => setStatus("error"));
	}, [token]);

	return (<>
		<section className="activation-container float">
			<h1>Activación de Cuenta</h1>
			{status === "loading" && (
				<div>
					<p>Por favor espere mientras se activa su cuenta</p>
					<p>No cierre esta ventana</p>
					<i className="bx bx-hourglass waiting" />
				</div>
			)}
			{status === "success" && (
				<div>
					<p>Cuenta activada con éxito</p>
					<i className="bx bx-check-circle success" />
				</div>
			)}
			{status === "error" && (
				<div>
					<p>Ocurrió un error al activar la cuenta</p>
					<i className="bx bx-x-circle error" />
				</div>
			)}
		</section>

	</>
	);
}
