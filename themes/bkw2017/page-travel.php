<?php/* Template Name: Travel */?>
<?php get_header(); ?>
<div class="right-side container">
	<div class="page-travel-content">
		<?php
		$args = array( 'post_type' => 'travels', 'posts_per_page' => 10);
		$loop = new WP_Query( $args );
		?>
		<div class="row">
			<?php
			while ( $loop->have_posts() ) : $loop->the_post();
				?>
				<div class="col-md-4 col-sm-6 col-lg-3">
					<div class="card travel-card">
						<?php
						if (has_post_thumbnail()) { ?>
						<img class="card-img-top" src="<?php the_post_thumbnail_url( 'full' );  ?>" alt="<?php the_post_thumbnail_url( 'full' );  ?>">
						<?php
						} else {
							?>
							<img class="card-img-top" src="https://www.theclementimall.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png">
							<?php
						}
						?>
						<div class="card-body">
							<h4 class="card-title">
								<a href="<?php the_permalink();?>"><?php the_title(); ?></a>
							</h4>
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
</div>
<?php get_footer(); ?>