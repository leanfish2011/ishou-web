var dateUtil = {
  beforeDate: function (before) {
    const end = new Date();
    const start = new Date();
    start.setHours(0);
    start.setMinutes(0);
    start.setSeconds(0);

    end.setHours(23);
    end.setMinutes(59);
    end.setSeconds(59);

    start.setDate(start.getDay() - before);

    let dateRange = new Array(start, end);

    return dateRange;
  }
}

export default dateUtil
