import axios from "axios";
import { useState, useEffect } from "react"

const Home = () => {
    const [municipios, setMunicipios] = useState([]);
    const [page, setPage] = useState(1);

    const getMunicipios = async() => {
        try {
            const response = await axios.get("http://municipios_backend.test/api/v1/municipios/sp/"+page);
            const data = response.data;
            setMunicipios(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getMunicipios();
    }, [page]);

    return (
        <div>
            <div class="max-w-5xl mx-auto">
                <h1>Listagem de municípios</h1>
                <div class="bg-white shadow-md rounded-lg overflow-hidden">
                    {municipios.length === 0 ? (
                        <p>Nenhum registro encontrado</p>
                    ) : (
                        <table class="min-w-full border border-emerald-300 rounded-md overflow-hidden">
                            <thead class="bg-emerald-200 text-emerald-700 uppercase text-sm">
                                <tr>
                                    <th class="py-3 px-6 text-left">Código</th>
                                    <th class="py-3 px-6 text-left">Município</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-emerald-200">
                                {municipios.data.map((municipio, key) => (
                                    <tr class="hover:bg-emerald-100" key={key}>
                                        <td class="py-1 px-4">{municipio.codigo}</td>
                                        <td class="py-1 px-4">{municipio.nome}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            <div class="flex justify-end mx-10 my-5">
                <nav class="inline-flex shadow-sm rounded-md overflow-hidden bg-white divide-x divide-gray-200">
                    {(() => {
                        if (municipios.length === 0) {
                            return
                        } else if (municipios.pagination.number_of_pages > 1) {
                            if (municipios.pagination.current_page > 1) {
                                return <button onClick={() => setPage(municipios.pagination.current_page - 1)} class="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 cursor-pointer">Anterior</button>
                            } else {
                                return
                            }
                        } 
                        if(municipios.pagination.number_of_pages > 1 && municipios.pagination.current_page < municipios.pagination.number_of_pages) {
                            return <button onClick={() => setPage(municipios.pagination.current_page + 1)} class="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 cursor-pointer">Próximo</button>
                        }
                    })()}

                    {(() => {
                        if (municipios.length === 0) {
                            return
                        } else {
                            return Array(municipios.pagination.number_of_pages).fill('').map((a , index) => {
                                return (() => {
                                    if (index + 1 === 1 && index + 1 < municipios.pagination.current_page - 5) {
                                        return <button key={index} onClick={() => setPage(index + 1)} class="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 cursor-pointer"> {index + 1} </button>
                                    } else if (index + 1 === municipios.pagination.current_page) {
                                        return <button key={index} onClick={() => setPage(index + 1)} class="px-4 py-2 text-sm text-indigo-600 font-semibold bg-indigo-100 cursor-pointer"> {index + 1} </button>
                                    } else if(index + 1 >= municipios.pagination.current_page - 5 && index + 1 <= municipios.pagination.current_page + 5) {
                                        return <button key={index} onClick={() => setPage(index + 1)} class="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 cursor-pointer"> {index + 1} </button>    
                                    } else if(index + 1 === municipios.pagination.number_of_pages && index + 1 > municipios.pagination.current_page + 5) {
                                        return <button key={index} onClick={() => setPage(index + 1)} class="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 cursor-pointer"> {index + 1} </button>    
                                    }
                                })()
                            })
                        }
                    })()}
                    
                    {(() => {
                        if (municipios.length === 0) {
                            return
                        } else if(municipios.pagination.number_of_pages > 1 && municipios.pagination.current_page < municipios.pagination.number_of_pages) {
                            return <button class="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 cursor-pointer">Próximo</button>;
                        }
                    })()}

                    {/* <a href="#" class="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">Anterior</a>

                    
                    <a href="#" class="px-4 py-2 text-sm text-indigo-600 font-semibold bg-indigo-100">1</a>
                    <a href="#" class="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">2</a>
                    <a href="#" class="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">3</a>
                    <span class="px-4 py-2 text-sm text-gray-400">...</span>
                    <a href="#" class="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">10</a>

                    
                    <a href="#" class="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">Próximo</a> */}
                    
                </nav>
            </div>
        </div>
    );
};

export default Home