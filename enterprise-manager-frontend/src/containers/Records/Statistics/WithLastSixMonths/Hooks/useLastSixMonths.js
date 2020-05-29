import { subMonths } from "date-fns"
import useDateRange from "../../WithDateRange/Hooks/useDateRange"

const useLastSixMonths = ({ statistics, colors, chartType }) => {
  const end = new Date()

  const start = new Date(subMonths(end, 5))

  const data = useDateRange({
    statistics,
    colors,
    chartType,
    startDate: start,
    endDate: end
  })

  return data
}

export default useLastSixMonths
