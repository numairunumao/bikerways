<?php get_header(); ?>
<div class="container">
	<div class="text-center">
		<h3><?php the_title(); ?></h3>
	</div>

	<div class="row">
			<div class="col-md-6"></div>
			<div class="col-md-6"></div>
	</div>

	<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
		<?php echo the_content(); ?>
		<?php endwhile; else: ?>
		<?php echo "No Content Found"; ?>
	<?php endif; ?>
</div>


<?php get_footer();?>
