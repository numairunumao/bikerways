<!DOCTYPE html>
<html>
<html>
<head>
  <?php wp_head(); ?>
  <meta charset="<?php bloginfo( 'charset' ); ?>" />
  <title><?php wp_title( '|', true, 'right' ); ?></title>
</head>

<body <?php body_class(); ?>>
    <header> 
        <div class="container-fluid top-menu">
            <div class="container">
                <div class="row">
                    <div class="col-md-2 col-xs-2"> 
                        <a class="navbar-logo" href="<?php echo esc_url( home_url( '/' ) ); ?>" title="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>" rel="home">
                            <?php if( get_field('logo_pic','option') ): ?>
                                <img class="logo-main" src="<?php the_field('logo_pic','option'); ?>">
                            <?php endif; ?>
                        </a>
                    </div>
                    <div class="col-md-10 col-xs-10"> 
                        <?php wp_nav_menu(array(
                            'theme_location' => 'primary',
                            'menu_class' => 'navbar'
                        ));
                        ?>
                    </div>
                </div>
            </div>
        </div>

    </header>




