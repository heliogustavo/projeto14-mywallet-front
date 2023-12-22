import { Value, ItemContainer, RightContainer } from "./styled"
import dayjs from "dayjs"
import { IoMdClose } from "react-icons/io"
import { useDeleteTransaction } from "../../services/transactions"
import { useNavigate } from "react-router-dom"

export default function TransactionItem({ transaction, getTransactions }) {
  const { _id, date, description, value, type } = transaction
  const deleteTransaction = useDeleteTransaction()
  const navigate = useNavigate()

  function onClickDelete() {
    const confirmDelete = window.confirm(`Tem certeza que deseja deletar ${description}?`)
    if (confirmDelete) deleteTransaction(_id, getTransactions)
  }

  function onClickEdit() {
    navigate(
      `/editar-transacao/${type === "expense" ? "saida" : "entrada"}`,
      { state: transaction }
    )
  }

  return (
    <ItemContainer>
      <div>
        <span>{dayjs(date).format("DD/MM")}</span>
        <strong data-test="registry-name" onClick={onClickEdit}>{description}</strong>
      </div>
      <RightContainer>
        <Value data-test="registry-amount" color={type}>{value.toFixed(2).toString().replace(".", ",")}</Value>
        <IoMdClose data-test="registry-delete" onClick={onClickDelete} />
      </RightContainer>
    </ItemContainer>
  )
}

