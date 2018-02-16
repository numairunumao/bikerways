<?php get_header(); ?>

<div class="container">
	<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
		<?php echo the_content(); ?>
		<?php endwhile; else: ?>
		<?php echo "No Content Found"; ?>
	<?php endif; ?>
</div>

<?php get_footer();?>

