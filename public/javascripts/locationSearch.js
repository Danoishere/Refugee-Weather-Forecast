$('#location-search').on('change textInput input', function () {
    var searchText = $('#location-search').val().toLowerCase();
    if (searchText === '') {
        $('.location-item').show();
    } else {
        $('.location-item').each(function () {
            var dataTitle = $(this).attr('data-title');
            if (dataTitle.toLowerCase().indexOf(searchText) >= 0) {
                $(this).show();
            }
            else {
                $(this).hide();
            }
        });
    }
});
