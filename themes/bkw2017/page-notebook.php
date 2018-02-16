<?php /* Template Name: Notebooks */ ?>
<?php get_header(); ?>
<div class="container">
	<h1 class="entry-title text-center">
		<?php the_title(); ?>
	</h1>
	<div class="row">
		<div class="col-md-3">
			<section class="left-search">
				<?php echo do_shortcode( '[px_filter id="dwnekmrudyqjmzd_0" post_type="notebook" ]' ); ?>
			</section>
		</div>

		<div class="col-md-9">
			<section class="nb-grid">
				<?php
				$args = array( 'post_type' => 'notebook', 'posts_per_page' => 10);
				$loop = new WP_Query( $args );
				while ( $loop->have_posts() ) : $loop->the_post();
				?>
				<!-- Post content -->
				<div class="col-md-3">
					<img src="<?php the_post_thumbnail_url( 'full' );  ?>" alt="<?php the_post_thumbnail_url( 'full' );  ?>">
					<h3><a href="<?php the_permalink();?>"><?php the_title(); ?></a></h3>
					<p><?php the_content(); ?></p>
				</div>
				<?php
				endwhile;
				wp_reset_postdata();
				?>
			</section>
		</div>
	</div>
	
</div>
<?php get_footer();?>