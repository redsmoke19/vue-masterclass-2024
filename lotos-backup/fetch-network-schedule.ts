const fetchNetworkSchedule = async (dates?: { startDate: string; endDate: string }) => {
  loading.value = true
  if (dates) {
    startDate.value = dates.startDate
    endDate.value = dates.endDate
    saveDatesToLocalStorage()
  }
  try {
    NetworkScheduleApi.getForPeriod({
      params: {
        id: Number(networkScheduleId.value)
      },
      queries: {
        from: startDate.value,
        to: endDate.value
      }
    })
      .then((res) => {
        dataTable.value = res
        techOperationStore.techOperationsReady.then(() => {
          columns.value = generateTableData(res, techOperationStore.techOperations ?? [], router)
        })
      })
      .catch((err) => {
        // const res = err.data;
        console.log(err)
        // dataTable.value = res;
        // columns.value = generateTableData(res, techOperationStore.techOperations ?? []);
      })
  } catch (error) {
    console.error('Ошибка при выполнении запроса:', error)
    dataTable.value = null
  } finally {
    loading.value = false
  }
}
