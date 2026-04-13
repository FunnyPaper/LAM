pub fn transform_abstract_path(path: String) -> String {
    path.trim_start_matches(r"\\?\").to_string()
}
