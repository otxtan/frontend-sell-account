const utils = {
    convertDateTimetoDateTimeLocal: (utcString) => {

        const utcDate = new Date(utcString); // Bước 1
        const year = utcDate.getFullYear();
        const month = utcDate.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0
        const day = utcDate.getDate();
        const hours = utcDate.getHours();
        const minutes = utcDate.getMinutes();

        // Bước 3: Sắp xếp lại các thành phần theo định dạng datetime-local
        const localDateTime = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}T${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        return localDateTime;


    }
}
export default utils;