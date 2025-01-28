import { useContext, useEffect, useState } from "react";
import { Dna } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Postagem from "../../../models/Postagem";
import { buscar } from "../../../services/Service";
import CardPostagem from "../cardPostagem/CardPostagem";
import { toastAlerta } from "../../../util/toastAlerta";

function ListarPostagemPorId() {
  const [postagem, setPostagem] = useState<Postagem | null>(null);

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  useEffect(() => {
    if (token === "") {
      toastAlerta("Você precisa estar logado", "info");
      navigate("/");
    }
  }, [token]);

  async function buscarPostagemPorId() {
    try {
      await buscar(`/postagens/${id}`, setPostagem, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: any) {
      if (error.toString().includes("403")) {
        toastAlerta("O token expirou, favor logar novamente", "info");
        handleLogout();
      } else {
        toastAlerta("Erro ao buscar a postagem. Tente novamente.", "erro");
      }
    }
  }

  useEffect(() => {
    if (id) {
      buscarPostagemPorId();
    }
  }, [id]);

  return (
    <>
      {!postagem ? (
        <Dna
          visible={true}
          height="200"
          width="200"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper mx-auto"
        />
      ) : (
        <div className="container mx-auto my-4 flex justify-center">
          <CardPostagem post={postagem} />
        </div>
      )}
    </>
  );
}

export default ListarPostagemPorId;
