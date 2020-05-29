import React from "react"
import { Button } from "antd"
import { useHistory, useLocation } from "react-router-dom"

const ClearFilters = ({ filtersApplied }) => {
  const history = useHistory()
  const location = useLocation()
  return (
    <Button
      type={filtersApplied.length > 0 ? "primary" : "default"}
      disabled={filtersApplied.length === 0}
      onClick={() =>
        filtersApplied.length > 0
          ? history.replace(location.pathname)
          : undefined
      }>
      Clear filters
    </Button>
  )
}

export default React.memo(ClearFilters)
