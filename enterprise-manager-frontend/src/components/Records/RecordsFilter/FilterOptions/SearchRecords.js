import React, { useEffect, useState } from "react"
import { AutoComplete, Form, Input } from "antd"
import { useHistory, useLocation } from "react-router-dom"
import { searchRecords } from "../../../../actions/recordActions"
import { useSelector, shallowEqual, useDispatch } from "react-redux"

const SearchRecords = ({ searchResult, resource, setCurrentFilteredBy }) => {
  const location = useLocation()
  const history = useHistory()
  const queryParams = new URLSearchParams(location.search)
  const dispatch = useDispatch()
  const { recordFields } = useSelector(
    ({ recordFields }) => ({ recordFields }),
    shallowEqual
  )

  const query = queryParams.get("query")
  const columnId = queryParams.get("column_id")
  const [options, setOptions] = useState([])
  const [value, setValue] = useState(query)

  const handleSearch = value => {
    setValue(value)
    if (value)
      dispatch(searchRecords(resource.organizationId, resource.id, value)).then(
        resp => {
          return resp.length > 0
            ? setOptions([
                ...recordFields[resource.id].map(f => ({
                  label: <span>{f.name}</span>,
                  options: [
                    {
                      value: f.id.toString(),
                      data: { query: value },
                      label: (
                        <span>
                          {
                            resp.filter(item =>
                              item.links.values[f.id]
                                .toString()
                                .toLowerCase()
                                .includes(value.toLowerCase())
                            ).length
                          }{" "}
                          results found on {value}
                        </span>
                      )
                    }
                  ]
                })),
                {
                  label: "All Columns",
                  options: [
                    {
                      value: `all_columns_${location.pathname}`,
                      data: { query: value },
                      label: (
                        <span>
                          {resp.length} results found on {value}
                        </span>
                      )
                    }
                  ]
                }
              ])
            : setOptions([])
        }
      )
    else setOptions([])
  }

  const onSelect = (value, option) => {
    if (option) {
      setValue(option.data.query)
      history.push({
        path: `${location.pathname}`,
        search:
          value !== `all_columns_${location.pathname}`
            ? `query=${option.data.query}&column_id=${value}`
            : `query=${option.data.query}`
      })
    } else {
      history.push({
        path: `${location.pathname}`
      })
    }
  }

  useEffect(() => {
    handleSearch(value)
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (query) searchResult()
    // eslint-disable-next-line
  }, [query, columnId])

  useEffect(() => {
    if (query && !columnId) setCurrentFilteredBy(`results for "${query}"`)
    else if (query && columnId) {
      setCurrentFilteredBy(
        `results for "${query}" and column "${
          recordFields[resource.id].find(f => f.id === parseInt(columnId)).name
        }"`
      )
      console.log(query, columnId)
    }
    // eslint-disable-next-line
  }, [query, columnId])

  return (
    <Form layout='vertical'>
      <Form.Item help='Search records'>
        <AutoComplete
          options={options}
          value={value}
          defaultValue={query}
          onSelect={onSelect}
          onSearch={handleSearch}
          notFoundContent={value ? "No results found" : undefined}>
          <Input.Search
            style={{
              border: query ? "1px solid #1890ff" : undefined
            }}
            placeholder='Enter keywords...'
          />
        </AutoComplete>
      </Form.Item>
    </Form>
  )
}

export default SearchRecords
