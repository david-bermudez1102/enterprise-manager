import { useEffect } from "react"
import { useDispatch } from "react-redux"

const AccountDelete = ({ match, accounts, removeAccount, history }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(removeAccount(match.params.accountId)).then(() =>
      history.replace("/accounts")
    )
    // eslint-disable-next-line
  }, [match, removeAccount, accounts, history])

  return null
}

export default AccountDelete
