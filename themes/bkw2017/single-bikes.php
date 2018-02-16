<?php get_header(); ?>
<div class="container">
	<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
	<?php echo the_content(); ?>
	<?php endwhile; else: ?>
	<?php echo "No Content Found"; ?>
	<?php endif; ?>
	<h1><?php //echo $tb_brand; ?></h1>
	<table class="table-single-bike table table-dark table-hover">
		<tbody>
			<tr>
				<td>ราคา</td>
				<td><?php echo do_shortcode('[lscf_customfield custom_field_id="ราคา__pxid_zmxaxwovkxzkkzc_0"]'); ?></td>
			</tr>
			<tr>
				<td>จำนวนสูบ</td>
				<td><?php echo do_shortcode('[lscf_customfield custom_field_id="จำนวนสูบ__pxid_xsvcyjgxmsvklxw_1"]') ?></td>
			</tr>
			<tr>
				<td>ระบบเกียร์</td>
				<td><?php echo do_shortcode('[lscf_customfield custom_field_id="เกียร์__pxid_ozzkzwfywdkjptx_2"]') ?></td>
			</tr>
			<tr>
				<td>แรงม้า</td>
				<td><?php the_field('bike_horse_power'); ?></td>
			</tr>
			<tr>
				<td>ABS</td>
				<td><?php echo do_shortcode('[lscf_customfield custom_field_id="abs__pxid_glurmzxqognmlyf_3"]') ?></td>
			</tr>
			<tr>
				<td>ประเภท</td>
				<td><?php echo do_shortcode('[lscf_customfield custom_field_id="ประเภท__pxid_trhfjnsohrikukg_0"]'); ?></td>
			</tr>
			<tr>
				<td>กระบอกสูบ</td>
				<td><?php echo do_shortcode('[lscf_customfield custom_field_id="cc__pxid_xptgvaigzholynp_1"]') ?></td>
			</tr>
			<tr>
				<td>ระบบวาล์ว</td>
				<td><?php the_field('bike_valve'); ?></td>
			</tr>
			<tr>
				<td>ระบายความร้อน</td>
				<td><?php the_field('bike_cooler'); ?></td>
			</tr>
			<tr>
				<td>แบบเครื่องยนตร์</td>
				<td><?php the_field('bike_engine'); ?></td>
			</tr>
			<tr>
				<td>ระบบจ่ายน้ำมัน</td>
				<td><?php the_field('bike_oil_dispenser'); ?></td>
			</tr>
			<tr>
				<td>ระบบจุดระเบิด</td>
				<td><?php the_field('bike_Ignition_system'); ?></td>
			</tr>
			<tr>
				<td>แรงบิด</td>
				<td><?php the_field('bike_torque_power'); ?></td>
			</tr>
			<tr>
				<td>จำนวนเกียร์</td>
				<td><?php the_field('bike_number_gear'); ?></td>
			</tr>
			<tr>
				<td>ความจุถังน้ำมัน</td>
				<td><?php the_field('bike_fuel_tank'); ?></td>
			</tr>
			<tr>
				<td>ระบบสตาร์ท</td>
				<td><?php the_field('bike_starter'); ?></td>
			</tr>
			<tr>
				<td>คลัช</td>
				<td><?php the_field('bike_clutch'); ?></td>
			</tr>
			<tr>
				<td>น้ำมันเชื่อเพลิง</td>
				<td><?php the_field('bike_fuel_type'); ?></td>
			</tr>
			<tr>
				<td>ระบบจ่ายน้ำมัน</td>
				<td><?php the_field('bike_oil_dispenser'); ?></td>
			</tr>
			<tr>
				<td>ระบบกันสะเทือน ล้อหน้า</td>
				<td><?php the_field('bike_front_shock_up'); ?></td>
			</tr>
			<tr>
				<td>ระบบกันสะเทือน ล้อหลัง</td>
				<td><?php the_field('bike_back_shock_up'); ?></td>
			</tr>
			<tr>
				<td>ขนาดยางหน้า</td>
				<td><?php the_field('bike_front_tire'); ?></td>
			</tr>
			
			<tr>
				<td>ขนาดยางหลัง</td>
				<td><?php the_field('bike_back_tire'); ?></td>
			</tr>
			<tr>
				<td>น้ำหนักตัวรถ</td>
				<td><?php the_field('bike_weight'); ?></td>
			</tr>
			<tr>
				<td>ขนาดรถ</td>
				<td><?php the_field('bike_dimention'); ?></td>
			</tr>
			<tr>
				<td>ความสูงเบาะ</td>
				<td><?php the_field('bike_height'); ?></td>
			</tr>
			<tr>
				<td>ระบบเบรคหน้า</td>
				<td><?php the_field('bike_front_break'); ?></td>
			</tr>
			<tr>
				<td>ระบบเบรคหลัง</td>
				<td><?php the_field('bike_back_break'); ?></td>
			</tr>
			<tr>
				<td>ชนิดของล้อ</td>
				<td><?php the_field('bike_wheel_tylpe'); ?></td>
			</tr>
			<tr>
				<td>เว็ปไซค์</td>
				<td><a target="_blank" href="<?php the_field('bike_web'); ?>"><?php the_field('bike_web'); ?></a></td>
			</tr>
			<tr>
				<td>ลงข้อมูลเมื่อวันที่</td>
				<td><?php the_field('bike_date_update'); ?></td>
			</tr>
		</tbody>
	</table>
</div>
<?php get_footer();?>