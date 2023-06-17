export var linkbase = "http://localhost:5173";
export var services_linkbase = "http://localhost:4000";

import { writable } from 'svelte/store';

 
export const isdragging = writable(false);
export const is_post_editor = writable(false);