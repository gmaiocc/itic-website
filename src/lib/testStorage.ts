// Test script to check Supabase Storage connection
// Run in browser console or add to a test page

import { supabase } from '@/lib/supabase';

export async function testStorageUpload() {
    console.log('🔍 Testing Supabase Storage...');

    // 1. Check if user is authenticated
    const { data: { session } } = await supabase.auth.getSession();
    console.log('Session:', session ? 'Authenticated ✅' : 'Not authenticated ❌');

    if (!session) {
        console.error('You must be logged in to upload!');
        return;
    }

    // 2. List buckets
    const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();
    console.log('Buckets:', buckets, bucketError);

    // 3. Try to create a simple text file
    const testContent = new Blob(['Hello World'], { type: 'text/plain' });
    const testFile = new File([testContent], 'test.txt', { type: 'text/plain' });

    const { data, error } = await supabase.storage
        .from('reports')
        .upload(`test-${Date.now()}.txt`, testFile, {
            cacheControl: '3600',
            upsert: false,
        });

    if (error) {
        console.error('❌ Upload Error:', error);
        console.error('Error details:', JSON.stringify(error, null, 2));
    } else {
        console.log('✅ Upload Success:', data);

        // Get public URL
        const { data: urlData } = supabase.storage
            .from('reports')
            .getPublicUrl(data.path);

        console.log('📎 Public URL:', urlData.publicUrl);
    }
}

// Call this function from browser console:
// testStorageUpload()
