<?php
/*
Template Name: Cal
*/
?>

<?php get_header(); ?>

<div class="container">
	<div class="calc">
		<label>ราคารถ</label>
		<input class="form-control" type="text" id="amount" name="amount" placeholder="ราคารถ" required><br>
		<label>ราคาดาวน์ (บาท)</label>
		<input class="form-control" type="text" id="down" placeholder="ราคาดาวน์"><br>
		<label>ราคาดาวน์ %</label>
		<input class="form-control" type="text" id="downpercent" placeholder="ราคาดาวน์"><br>
		<label>จำนวนเดือน</label>
		<input class="form-control" type="text" id="months" placeholder="จำนวนเดือน"><br>
		<label>จำนวนปี</label>
		<input class="form-control" type="text" id="years" placeholder="จำนวนปี"><br>
		<label>ดอกเบี้ย</label>
		<input class="form-control" type="text" id="interest" placeholder="ดอกเบี้ย"><br>
		<button class="btn" onclick="myFunction()">Calculate</button>
		<p>เดือนละ</p><p id="output"></p>
	</div>
	<script type="text/javascript">
		 function myFunction() {
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
            document.getElementById("output").innerHTML = calculation.toFixed(2);
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
</div>

<?php get_footer(); ?>


