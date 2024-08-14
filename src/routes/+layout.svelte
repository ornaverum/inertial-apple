<script>
	import '../app.css';
	import { DarkMode } from 'flowbite-svelte';
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
	let darkmodebtn =
		'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-lg p-2.5 fixed right-4 top-2 z-50';
	import { Footer, FooterBrand, FooterCopyright, FooterIcon, FooterLink, FooterLinkGroup } from 'flowbite-svelte';

</script>

<!-- <DarkMode btnClass={darkmodebtn} /> -->
 <!-- <DarkMode></DarkMode> -->

<Navbar  >
	<NavBrand href="/">
	  <object data="IALogo.svg" class="me-3 h-6 sm:h-9" alt="Inertial Apple Logo" />
	  <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Inertial Apple</span>

	</NavBrand>
	<NavHamburger  />
	<NavUl >
	  <NavLi href="/">Home</NavLi>
	  <NavLi href="/free-body-diagram">Free Body Diagram</NavLi>
	  <NavLi href="/motion-diagram">Motion Diagram</NavLi>
	  <NavLi href="/graph-maker">Graph Maker</NavLi>
	  <NavLi href="/grapher">Grapher</NavLi>
	  <NavLi href="/vid-analysis">Video Analysis</NavLi>
	</NavUl>
  </Navbar>
<slot />


<Footer class="z-20 w-full p-4 bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600">
	<div class="sm:flex sm:items-center sm:justify-between">
	<FooterCopyright href="/" by="Jack Neel Waddell" year={2024} />
	<FooterLinkGroup ulClass="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
	  <FooterLink href="/">About</FooterLink>
	  <FooterLink href="/">Privacy Policy</FooterLink>
	  <FooterLink href="/">Licensing</FooterLink>
	  <FooterLink href="/">Contact</FooterLink>
	</FooterLinkGroup>
	</div>
  </Footer>


