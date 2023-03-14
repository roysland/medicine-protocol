<script>
    import moment from "moment";
    import TodaysMedicine from "../lib/medicine/TodaysMedicine.svelte";
    import WeekBar from "../lib/WeekBar/WeekBar.svelte";
    let selectedDate = moment().format('YYYY-MM-DD');
    
    function changeDate(day) {
      selectedDate = day;
    }
    </script>
    
    <WeekBar selectedDate={selectedDate} on:changeDate={(e) => changeDate(e.detail)}></WeekBar>

    <TodaysMedicine day={selectedDate}></TodaysMedicine>
    
    