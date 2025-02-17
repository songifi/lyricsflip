pub mod interfaces {
    pub mod lyricsflip;
}

pub mod contracts {
    pub mod lyricsflip;
    pub mod lyricsflipNFT;
}

pub mod utils {
    pub mod errors;
    pub mod types;
}

#[cfg(test)]
mod tests {
    mod test_lyricsflip;
    mod test_lyricsflipNFT;
}
