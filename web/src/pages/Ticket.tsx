import { TicketStatus } from "../components/TicketStatus";

export function Ticket() {
  return (
    <>
      <h1 className="text-blue-dark font-lato font-bold text-2xl mb-3">
        Chamados
      </h1>

      <div className="border border-gray-500 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead
            className=" text-gray-400 font-lato font-bold text-base
          border border-gray-500 text-left"
          >
            <tr>
              <th className="p-4">Atualizado em</th>
              <th className="p-4">Id</th>
              <th className="p-4">Título e Serviço</th>
              <th className="p-4">Valor total</th>
              <th className="p-4">Cliente</th>
              <th className="p-4">Técnico</th>
              <th className="p-4">Status</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody className="border border-gray-500">
            <tr>
              <td className="p-4 text-basefont-lato">13/04/25 20:56</td>
              <td className="p-4 text-sm font-lato font-bold">00003</td>
              <td className="p-4 text-sm font-lato">
                <span className="font-bold"> Rede lenta</span>
                <p>Instalação de Rede </p>
              </td>
              <td className="p-4 text-base font-lato">R$ 180,00</td>
              <td className="p-4 font-lato">
                <div className="flex items-center gap-2">
                  <span
                    className="bg-blue-dark p-1 
                    font-lato text-sm text-gray-600
                    rounded-full flex justify-center items-center"
                  >
                    AC
                  </span>
                  <p className="text-base">André Costa</p>
                </div>
              </td>
              <td className="p-4 font-lato">
                <div className="flex items-center gap-2">
                  <span
                    className="bg-blue-dark p-1 
                    font-lato text-sm text-gray-600
                    rounded-full flex justify-center items-center"
                  >
                    CS
                  </span>
                  <p className="text-base">Carlos Silva</p>
                </div>
              </td>
              <td className="p-4 text-base font-lato">
                <TicketStatus status="Open" />
              </td>
              <td className="p-4">
                <button className="bg-gray-500 p-3 rounded-md cursor-pointer hover:text-gray-600 hover:bg-blue-dark">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M23.836 5.33366C23.4389 5.33366 23.0582 5.49138 22.7774 5.77211L6.76278 21.7868C6.60434 21.9451 6.48809 22.1411 6.42526 22.3561C6.42524 22.3562 6.42529 22.356 6.42526 22.3561L5.64855 25.0181L8.3105 24.2413L8.31117 24.2411C8.52652 24.1784 8.72257 24.0624 8.88118 23.9038L24.8945 7.8892C25.1752 7.60846 25.333 7.22766 25.333 6.83064C25.333 6.43361 25.1752 6.05285 24.8945 5.77211C24.6138 5.49138 24.233 5.33366 23.836 5.33366ZM20.8918 3.8865C21.6727 3.10566 22.7317 2.66699 23.836 2.66699C24.9402 2.66699 25.9993 3.10566 26.7801 3.8865C27.5609 4.66733 27.9996 5.72637 27.9996 6.83064C27.9996 7.93491 27.5609 8.99395 26.7801 9.77478L10.7668 25.7894C10.2912 26.265 9.70322 26.6131 9.05744 26.8013C9.05721 26.8013 9.05699 26.8014 9.05676 26.8015L5.22811 27.9186C4.88391 28.019 4.51892 28.025 4.17161 27.9361C3.8243 27.8471 3.50729 27.6664 3.25376 27.4129C3.00023 27.1593 2.81952 26.8423 2.73054 26.495C2.64156 26.1477 2.64758 25.7828 2.74797 25.4386L3.86534 21.6092C4.05375 20.964 4.40179 20.3764 4.87716 19.9012C4.87707 19.9012 4.87725 19.9011 4.87716 19.9012L20.8918 3.8865ZM14.6666 26.6666C14.6666 25.9303 15.2636 25.3333 16 25.3333H28C28.7363 25.3333 29.3333 25.9303 29.3333 26.6666C29.3333 27.403 28.7363 28 28 28H16C15.2636 28 14.6666 27.403 14.6666 26.6666Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
