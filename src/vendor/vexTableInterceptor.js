import VXETable from 'vxe-table'
/**
 * 跳转下一个编辑
 * @param {*} $table
 */
const editNextCell = async($table) => {
  const { row, column, $rowIndex, $columnIndex, columnIndex, rowIndex } = await $table.getActiveRecord() || {}
  if (row) { // 当前为编辑状态
    // console.log('row', row)
    // 当前列属性
    const nowField = column.property
    // 获取展示的列
    const { visibleColumn } = $table.getTableColumn()
    // 当前列属性（可以编辑的属性）
    const columnsField = visibleColumn.reduce((a, v, i) => {
      if (i !== 0 && i !== visibleColumn.length - 1 && v.editRender) { // 不是操作和序号且不可以编辑
        a.push(v.property)
      }
      return a
    }, [])
    const nowIndex = columnsField.findIndex(v => v === nowField)
    // 判断当前是否最后一列
    const isLastColumn = nowIndex === columnsField.length - 1
    // console.log('isLastColumn', isLastColumn)
    if (isLastColumn) {
      // 插入数据
      const record = {
        checked: false, // 用于大数据量勾选性能优化
        IS_TEMP: true // 临时数据标识
      }
      Object.values(row).forEach(v => {
        if (v !== '_XID') {
          record[v] = null
        }
      })
      // 在第一行插入数据
      const { row: newRow } = await $table.insertAt(record, -1)
      // 编辑第一个
      // await $table.scrollTo(0)
      // await $table.setActiveCell(row, columnsField[0])
      // Vue.$message({
      //   message: '',
      //   type: 'success'
      // });

      // 跳转到下一行
      // 判断当前是否为临时数据
      const isInsertByRow = $table.isInsertByRow(row)
      const ROW_INDEX = isInsertByRow ? await $table.$getRowIndex(row) : rowIndex
      const insertRecords = $table.getInsertRecords() // 临时数据
      let nextRow = {}
      // 不是最后一条临时数据
      if (isInsertByRow && insertRecords.length - 1 !== ROW_INDEX) {
        nextRow = $table.getInsertRecords()[ROW_INDEX + 1]
      } else {
        // 当前是最后一条临时数据
        if (isInsertByRow) {
          nextRow = $table.getData()[0]
        } else {
          nextRow = $table.getData()[ROW_INDEX + 1]
        }
      }
      if (nextRow) {
        await $table.scrollTo(0)
        await $table.setActiveCell(nextRow, columnsField[0])
      }
    } else {
      // 跳转下一个编辑
      await $table.setActiveCell(row, columnsField[nowIndex + 1])
    }
  }
}
const init = () => {
  VXETable.interceptor.mixin({
    // $table: 当前表格对象
    'event.keydown': async({ $table }, e) => {
      // 禁用默认回车按钮
      if (e.key === 'Enter') {
        editNextCell($table)
        return false
      }
    }
  })
}
init()
