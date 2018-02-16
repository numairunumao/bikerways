<?php/* Template Name: Travel */?>

<?php get_header(); ?>

<div class="container">
	<?php
	$args = array( 'post_type' => 'travels', 'posts_per_page' => 10);
	$loop = new WP_Query( $args );
	?>
	<div class="row">
		<?php
			while ( $loop->have_posts() ) : $loop->the_post();
			?>
				<div class="col-md-4">
					<div class="card">
						<img class="card-img-top" src="<?php the_post_thumbnail_url( 'full' );  ?>" alt="<?php the_post_thumbnail_url( 'full' );  ?>">
						<div class="card-body">
							<h4 class="card-title"><a href="<?php the_permalink();?>"><?php the_title(); ?></a></h4>
							<p><?php echo the_excerpt(); ?></p>
							<a href="<?php the_permalink();?>">อ่านเพิ่ม</a>
						</div>
					</div>
				</div>
			<?php
			endwhile; ?>
		<?php
		wp_reset_postdata();
		?>
	</div>
</div>

<?php get_footer(); ?>

