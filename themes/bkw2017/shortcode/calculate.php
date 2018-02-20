<?php
function calFunction() {
ob_start();
?>
<table class="table-single-bike table table-cal">
	<thead>
		<tr>
			<td colspan="2">คำนวนค่างวด</td>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>ราคารถ</td>
			<td><input class="form-control" type="text" id="amount" name="amount" placeholder="ราคารถ" required></td>
		</tr>
		<tr>
			<td>ราคาดาวน์ (บาท)</td>
			<td><input class="form-control" type="text" id="down" placeholder="ราคาดาวน์"></td>
		</tr>
		<tr>
			<td>ราคาดาวน์ %</td>
			<td><input class="form-control" type="text" id="downpercent" placeholder="ราคาดาวน์"></td>
		</tr>
		<tr>
			<td>จำนวนเดือน</td>
			<td><input class="form-control" type="text" id="months" placeholder="จำนวนเดือน"></td>
		</tr>
		<tr>
			<td>จำนวนปี</td>
			<td><input class="form-control" type="text" id="years" placeholder="จำนวนปี"></td>
		</tr>
		<tr>
			<td>ดอกเบี้ย</td>
			<td><input class="form-control" type="text" id="interest" placeholder="ดอกเบี้ย"></td>
		</tr>
	</tbody>
	<tfoot>
		<tr>
			<td><button class="btn" onclick="myFunctionCal()">คำนวน</button></td>
			<td><span id="output"></span></td>
		</tr>
	</tfoot>
</table>

<script type="text/javascript">
	function myFunctionCal() {
var loan = jQuery('#amount').val(),
month = jQuery('#months').val(),
int = jQuery('#interest').val(),
years = jQuery('#years').val(),
down = jQuery('#down').val(),
amount = parseInt(loan),
months = parseInt(month),
down = parseInt(down),
annInterest = parseFloat(int),
monInt = annInterest / 1200,
// calculation = ((monInt + (monInt / (Math.pow((1 + monInt), months) -1))) * (amount - (down || 0))).toFixed(2);
real = (amount - (down || 0));
interperyear = (annInterest / 100) * real;
intsum = (real + (interperyear * years));
calculation = intsum / months ;
document.getElementById("output").innerHTML = "เดือนละ " + calculation.toFixed(2) + " บาท";

}
// กรอกที่ช่อง Month
jQuery(function(){
var month = jQuery(this).val(),
doneTypingInterval = 500,
months = parseInt(month),
typingTimer;
jQuery('#months').keyup(function(){
month = jQuery(this).val();
months = parseInt(month);
clearTimeout(typingTimer);
if (month) {
typingTimer = setTimeout(doneTyping, doneTypingInterval);
}
});
function doneTyping () {
jQuery('#years').val(months/12);
}
})
// กรอกที่ช่อง Years
jQuery(function(){
var year = jQuery(this).val(),
doneTypingInterval = 500,
years = parseInt(year),
typingTimer;
jQuery('#years').keyup(function(){
year = jQuery(this).val();
myears = parseInt(year);
clearTimeout(typingTimer);
if (year) {
typingTimer = setTimeout(doneTyping, doneTypingInterval);
}
});
function doneTyping () {
$('#months').val(year * 12);
}
})
// กรอกที่ช่อง ราคาดาวน์ บาท
jQuery(function() {
var percent = jQuery(this).val(),
doneTypingInterval = 500,
percent = parseInt(percent),
typingTimer;
jQuery('#down').keyup(function(){
percent = jQuery(this).val();
percent = parseInt(percent);
clearTimeout(typingTimer);
if (percent) {
typingTimer = setTimeout(doneTyping, doneTypingInterval);
}
});
function doneTyping () {
var amount = jQuery('#amount').val();
jQuery('#downpercent').val((percent / amount) * 100);
}
})
// กรอกที่ช่อง ราคาดาวน์ %
jQuery(function() {
var percent = jQuery(this).val(),
doneTypingInterval = 500,
percent = parseInt(percent),
typingTimer;
jQuery('#downpercent').keyup(function(){
percent = jQuery(this).val();
percent = parseInt(percent);
clearTimeout(typingTimer);
if (percent) {
typingTimer = setTimeout(doneTyping, doneTypingInterval);
}
});
function doneTyping () {
var amount = jQuery('#amount').val();
jQuery('#down').val((percent / 100) * amount);
}
})
</script>
<?php
return ob_get_clean();
}
add_shortcode('calculate-shortcode', 'calFunction');
?>